import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { SubmitEvent } from 'react';

import Heading from '../components/Heading';


function Login() {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		setError('');

		try {
			const response = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});
			const data = await response.json();

			if (!response.ok) {
				setError(typeof data.detail === 'string' ? data.detail : 'Something went wrong');
				return;
			}

			navigate('/dashboard'); // logged in, go home
		} catch {
			setError('Could not reach the server.');
		}
	}

	function signupClick() {
		navigate('/signup');
	}

	function homeClick() {
		navigate('/');
	}
	
	return (
		<main>
			<div className = 'flex items-start w-full'>
				<Heading title='Login' />

				<div className = 'ml-auto'>
					<button className = 'my-1.5 px-10 py-3 text-2xl' onClick={signupClick}>signup</button>
					<button className = 'my-1.5 ml-5 mr-1.5 px-10 py-3 text-2xl' onClick={homeClick}>home</button>
				</div>
			</div>

			<form className = 'authentication-form' onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				></input>
				<input
					type='password'
					placeholder='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				></input>
				<button type='submit'>login</button>
				{error && <p className='text-red-600'>{error}</p>}
			</form>
		</main>
	);
}

export default Login;