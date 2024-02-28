import { useRoutes } from 'react-router-dom';
import Sliders from './components/Sliders';

function App() {
	const element = useRoutes([
		{
			path: '/',
			element: <Sliders />,
		},
	]);

	return element;
}

export default App;
