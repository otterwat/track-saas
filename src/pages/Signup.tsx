import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { SubmitEvent } from 'react';

import Heading from '../components/Heading';

function Signup() {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		setError('');

		try {
			const response = await fetch('/api/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ username, password }),
			});
			const data = await response.json();

			if (!response.ok) {
				setError(typeof data.detail === 'string' ? data.detail : 'Something went wrong');
				return;
			}

			navigate('/login'); // account created, send them to the login page
		} catch {
			setError('Could not reach the server.');
		}
	}

	function loginClick() {
		navigate('/login');
	}

	function homeClick() {
		navigate('/');
	}
	
	
	return (
		<main>
			<div className = 'authentication-ui'>
				<Heading title='Signup' />
				<div className = 'inline-grid grid-cols-2 gap-5'>
					<button onClick={loginClick}>login</button>
					<button className = 'mr-1.5' onClick={homeClick}>home</button>
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
				<button type='submit'>signup</button>
				{error && <p className='text-red-600'>{error}</p>}
			</form>
		</main>
	);
}

export default Signup;