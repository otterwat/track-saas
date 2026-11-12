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
			<div className = 'authentication-ui'>
				<Heading 
					title='Welcome!'
					description='This is a simple Track SaaS application where you can manage your running and improvement efficiently.'
				/>

				<div className = 'inline-grid grid-cols-2 gap-3'>
					<button onClick={loginClick}>login</button>
					<button className = 'mr-1.5' onClick={signupClick}>signup</button>
				</div>
			</div>
			
		</main>
	);
}

export default Home;