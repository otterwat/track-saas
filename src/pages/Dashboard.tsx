import { useNavigate } from 'react-router-dom';
import Heading from '../components/Heading';

function Dashboard() {
	const navigate = useNavigate();
	function quizClick() {
		navigate('/quiz');
	}	
	function logoutClick() {
		navigate('/');
	}

	return (
		<main>
			<Heading title='Dashboard' />
			<button className="btn mx-5 mt-5 px-10 py-2  rounded" onClick={quizClick}>Take Quiz</button>
			<button className="logout-button" onClick={logoutClick}>Logout</button>
		</main>
	);
}

export default Dashboard;