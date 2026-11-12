import { useNavigate } from 'react-router-dom';
import Heading from '../components/Heading';

function Home() {
	const navigate = useNavigate();

	function loginClick() {
    navigate('/login');
  }

	function signupClick() {
    navigate('/signup');
  }

	return (
		<main>
			<div className = 'flex items-start flex-wrap w-full'>
				<Heading 
					title='Welcome!'
					description='This is a simple Track SaaS application where you can manage your running and improvement efficiently.'
				/>

				<div className = 'ml-auto'>
					<button className = 'my-1.5 px-10 py-3 text-2xl' onClick={loginClick}>login</button>
					<button className = 'my-1.5 ml-5 mr-1.5 px-10 py-3 text-2xl' onClick={signupClick}>signup</button>
				</div>
			</div>
			
		</main>
	);
}

export default Home;