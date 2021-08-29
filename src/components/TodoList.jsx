import PropTypes from 'prop-types';

const TodoList = ({
	todos,
	completeTodo,
	markAsEditing,
	updateTodo,
	deleteTodo,
}) => {
	return (
		<>
			<ul className="todo-list">
				{todos.map(todo => (
					<li className="todo-item-container" key={todo.id}>
						<div className="todo-item">
							<input
								type="checkbox"
								checked={todo.isComplete ? true : false}
								onChange={() => completeTodo(todo.id)}
							/>
							{!todo.isEditing ? (
								<span
									className={`todo-item-label ${
										todo.isComplete ? 'line-through' : ''
									}`}
									onDoubleClick={() => markAsEditing(todo.id)}>
									{todo.title}
								</span>
							) : (
								<input
									type="text"
									className="todo-item-input"
									defaultValue={todo.title}
									onBlur={e => updateTodo(e, todo.id)}
									onKeyDown={e => {
										if (e.key === 'Enter' || e.key === 'Escape') {
											updateTodo(e, todo.id);
										}
									}}
									autoFocus
								/>
							)}
						</div>
						<button className="x-button" onClick={() => deleteTodo(todo.id)}>
							<svg
								className="x-button-icon"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</li>
				))}
			</ul>

			<div className="check-all-container">
				<div>
					<div className="button">Check All</div>
				</div>

				<span>3 items remaining</span>
			</div>

			<div className="other-buttons-container">
				<div>
					<button className="button filter-button filter-button-active">
						All
					</button>
					<button className="button filter-button">Active</button>
					<button className="button filter-button">Completed</button>
				</div>
				<div>
					<button className="button">Clear completed</button>
				</div>
			</div>
		</>
	);
};

TodoList.propTypes = {
	todos: PropTypes.array.isRequired,
	completeTodo: PropTypes.func.isRequired,
	markAsEditing: PropTypes.func.isRequired,
	updateTodo: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired,
};

export default TodoList;
