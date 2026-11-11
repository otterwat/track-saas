import Heading from './components/Heading';

function App() {
	const username = 'Otterwat';

	return (
		<main>
			<Heading 
				title={`Hello ${username}!`} 
				subheading='Welcome to Track SaaS' 
				description='This is a simple Track SaaS application where you can manage your tasks efficiently.'
			/>
			<div className = 'flex justify-center'>
				<div className = 'authentication-ui'>
					<button>Log in</button>
					<button>Sign up</button>
				</div>
			</div>
		</main>
	);
}

export default App;