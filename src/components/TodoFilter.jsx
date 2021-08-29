import PropTypes from 'prop-types';

const TodoFilters = ({ todosFiltered, filter, setFilter }) => {
	return (
		<div className="todo-filters">
			<button
				className={`button filter-button ${
					filter === 'all' ? 'filter-button-active' : ''
				}`}
				onClick={() => {
					setFilter('all');
					todosFiltered('all');
				}}>
				All
			</button>
			<button
				className={`button filter-button ${
					filter === 'active' ? 'filter-button-active' : ''
				}`}
				onClick={() => {
					setFilter('active');
					todosFiltered('active');
				}}>
				Active
			</button>
			<button
				className={`button filter-button ${
					filter === 'completed' ? 'filter-button-active' : ''
				}`}
				onClick={() => {
					setFilter('completed');
					todosFiltered('completed');
				}}>
				Completed
			</button>
		</div>
	);
};

TodoFilters.propTypes = {
	todosFiltered: PropTypes.func.isRequired,
	filter: PropTypes.string.isRequired,
	setFilter: PropTypes.func.isRequired,
};

export default TodoFilters;
