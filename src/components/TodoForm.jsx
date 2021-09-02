import { useContext, useState } from 'react';
import { TodosContext } from '../context/TodosContext';

const TodoForm = () => {
	const [todoInput, setTodoInput] = useState('');
	const { todos, setTodos, idForTodo, setIdForTodo } = useContext(TodosContext);

	const handleInput = ({ target }) => {
		setTodoInput(target.value);
	};

	const addTodo = e => {
		e.preventDefault();

		if (todoInput.trim().length === 0) return;

		setTodos([
			...todos,
			{
				id: idForTodo,
				title: todoInput,
				isComplete: false,
			},
		]);

		setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
		setTodoInput('');
	};

	return (
		<>
		<h2>Todo App</h2>
		<form action="#" className="todo-form-app" onSubmit={addTodo}>
			<input
				type="text"
				className="todo-input"
				placeholder="What do you need to do?"
				value={todoInput}
				onChange={handleInput}
			/>
			<button type="button" className="todo-form-app-submit" onClick={addTodo}>
			<svg className="svg-icon-submit" viewBox="0 0 20 20">
				<path d="M17.218,2.268L2.477,8.388C2.13,8.535,2.164,9.05,2.542,9.134L9.33,10.67l1.535,6.787c0.083,0.377,0.602,0.415,0.745,0.065l6.123-14.74C17.866,2.46,17.539,2.134,17.218,2.268 M3.92,8.641l11.772-4.89L9.535,9.909L3.92,8.641z M11.358,16.078l-1.268-5.613l6.157-6.157L11.358,16.078z"></path>
			</svg>
			</button>
		</form>
		</>
	);
};

export default TodoForm;
