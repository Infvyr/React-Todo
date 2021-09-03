import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

const TodoFilters = () => {
	const { filter, setFilter, todosFiltered } = useContext(TodosContext);

	return (
		<div className="todo-filters">
			<button
				className={`button filter-button ${
					filter === 'all' ? 'filter-button-active' : ''
				}`}
				onClick={() => {
					setFilter('all');
					todosFiltered();
				}}>
				All
			</button>
			<button
				className={`button filter-button ${
					filter === 'active' ? 'filter-button-active' : ''
				}`}
				onClick={() => {
					setFilter('active');
					todosFiltered();
				}}>
				Active
			</button>
			<button
				className={`button filter-button ${
					filter === 'completed' ? 'filter-button-active' : ''
				}`}
				onClick={() => {
					setFilter('completed');
					todosFiltered();
				}}>
				Completed
			</button>
		</div>
	);
};

export default TodoFilters;
