import hashlib
import hmac
import secrets

def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    password_hash = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 310_000)
    return f"pbkdf2_sha256$310000${salt.hex()}${password_hash.hex()}"

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        algorithm, iterations, salt_hex, hash_hex = hashed_password.split("$", 3)
        if algorithm != "pbkdf2_sha256":
            return False
        password_hash = hashlib.pbkdf2_hmac(
            "sha256", plain_password.encode(), bytes.fromhex(salt_hex), int(iterations)
        )
        return hmac.compare_digest(password_hash.hex(), hash_hex)
    except (ValueError, TypeError):
        return False