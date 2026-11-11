import Heading from './components/Heading';

function App() {
	const username = 'Otterwat';

	return (
		<main>
			<Heading 
				title={`Hello ${username}!`} 
				subheading='Welcome to Track SaaS' 
				description='This is a simple Track SaaS application where you can manage your running and improvement efficiently.'
			/>

			<div className = 'w-fit mx-auto'>
				<div className = 'authentication-ui'>
					<button>login</button>
					<button>signup</button>	
				</div>

				<form className = 'authentication-form'>
					<input
						type='text'
						placeholder='username'
					></input>
					<input
						type='password'
						placeholder='password'
					></input>
					
					<button type='submit'>login/signup</button>
				</form>
			</div>
			
			
		</main>
	);
}

export default App;