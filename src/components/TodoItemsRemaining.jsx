import PropTypes from 'prop-types';

const TodoItemsRemaining = ({ remaining }) => {
	return <span>{remaining()} items remaining</span>;
};

TodoItemsRemaining.propTypes = {
	remaining: PropTypes.func.isRequired,
};

export default TodoItemsRemaining;
