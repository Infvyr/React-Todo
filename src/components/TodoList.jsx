import { useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { TodosContext } from '../context/TodosContext';

import TodoCheck from './TodoCheck';
import TodoClearCompleted from './TodoClearCompleted';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoFilter from './TodoFilter';


const TodoList = () => {
	const { todosFiltered, setTodos, todos } = useContext(TodosContext);

	const deleteTodo = id => {
		setTodos([...todos].filter(todo => todo.id !== id));
	};

	const completeTodo = id => {
		const updatedTodos = todos.map(todo => {
			if (todo.id === id) todo.isComplete = !todo.isComplete;

			return todo;
		});

		setTodos(updatedTodos);
	};

	const markAsEditing = id => {
		const updatedTodos = todos.map(todo => {
			if (todo.id === id) todo.isEditing = true;

			return todo;
		});

		setTodos(updatedTodos);
	};

	const updateTodo = (e, id) => {
		const updatedTodos = todos.map(todo => {
			if (todo.id === id) {
				if (e.target.value.trim().length === 0 || e.key === 'Escape') {
					todo.isEditing = false;
					return todo;
				}
				todo.title = e.target.value;
				todo.isEditing = false;
			}
			return todo;
		});

		setTodos(updatedTodos);
	};

	return (
		<>
			<TransitionGroup 
				component="ul"
				className="todo-list"
			>
				{todosFiltered().map(todo => (
					<CSSTransition key={todo.id} timeout={300} classNames="item">
						<li className="todo-item-container">
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
					</CSSTransition>
				))}
			</TransitionGroup>

			<div className="check-all-container">
				<TodoCheck />
				<TodoItemsRemaining />
			</div>

			<div className="other-buttons-container">
				<TodoFilter />
				<div>
					<TodoClearCompleted />
				</div>
			</div>
		</>
	);
};

export default TodoList;
