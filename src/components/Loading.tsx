import './SCSS/Loading.scss';
import { FaUndoAlt } from 'react-icons/fa';

const DefaultError = () => {
	return (
		<div className="error-container">
			<div className="error-smaller_container">
				<h1 className="error-title">Loading</h1>
				<div className="error-icon_container">
					<FaUndoAlt className="error-icon" />
				</div>
			</div>
		</div>
	);
};

export default DefaultError;
