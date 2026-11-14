import { useNavigate } from 'react-router-dom';
import Heading from '../components/Heading';

function Dashboard() {
	const navigate = useNavigate();
	function quizClick() {
		navigate('/quiz');
	}	


	return (
		<main>
			<Heading title='Dashboard' />
			<button className="px-10 py-2 rounded bg-blue-600 text-white" onClick={quizClick}>Take Quiz</button>
		</main>
	);
}

export default Dashboard;