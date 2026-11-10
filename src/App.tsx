import Heading from './components/Heading';

function App() {
	const username = 'Otterwat';

	return (
		<main>
			<div>
				<Heading className='font-bold text-center text-6xl' title={`Hello ${username}!`}/>
				<h2 className='font-bold text-center text-4xl'>Welcome to Track SaaS</h2>
			</div>
		</main>
	);
}

export default App;