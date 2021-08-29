import PropTypes from 'prop-types';

const TodoClearCompleted = ({ clearCompleted }) => {
	return (
		<button className="button" onClick={clearCompleted}>
			Clear completed
		</button>
	);
};

TodoClearCompleted.propTypes = {
	clearCompleted: PropTypes.func.isRequired,
};

export default TodoClearCompleted;
