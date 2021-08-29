import PropTypes from 'prop-types';

const TodoCheckAll = ({ checkAllTodos, unCheckAllTodos }) => {
	return (
		<div className="check-all-buttons">
			<button className="button" onClick={checkAllTodos}>
				Check All
			</button>
			<button className="button" onClick={unCheckAllTodos}>
				Uncheck All
			</button>
		</div>
	);
};

TodoCheckAll.propTypes = {
	checkAllTodos: PropTypes.func.isRequired,
	unCheckAllTodos: PropTypes.func.isRequired,
};

export default TodoCheckAll;
