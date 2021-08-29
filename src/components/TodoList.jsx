import { useState } from 'react';
import PropTypes from 'prop-types';
import TodoCheck from './TodoCheck';
import TodoClearCompleted from './TodoClearCompleted';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoFilter from './TodoFilter';

const TodoList = ({
	// todos,
	todosFiltered,
	completeTodo,
	markAsEditing,
	updateTodo,
	deleteTodo,
	remaining,
	clearCompleted,
	checkAllTodos,
	unCheckAllTodos,
}) => {
	const [filter, setFilter] = useState('all');

	return (
		<>
			<ul className="todo-list">
				{todosFiltered(filter).map(todo => (
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
				<TodoCheck
					checkAllTodos={checkAllTodos}
					unCheckAllTodos={unCheckAllTodos}
				/>
				<TodoItemsRemaining remaining={remaining} />
			</div>

			<div className="other-buttons-container">
				<TodoFilter
					todosFiltered={todosFiltered}
					filter={filter}
					setFilter={setFilter}
				/>
				<div>
					<TodoClearCompleted clearCompleted={clearCompleted} />
				</div>
			</div>
		</>
	);
};

TodoList.propTypes = {
	// todos: PropTypes.array.isRequired,
	todosFiltered: PropTypes.func.isRequired,
	completeTodo: PropTypes.func.isRequired,
	markAsEditing: PropTypes.func.isRequired,
	updateTodo: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired,
	remaining: PropTypes.func.isRequired,
	clearCompleted: PropTypes.func.isRequired,
	checkAllTodos: PropTypes.func.isRequired,
	unCheckAllTodos: PropTypes.func.isRequired,
};

export default TodoList;
