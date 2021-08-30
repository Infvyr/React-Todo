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
		<form action="#" onSubmit={addTodo}>
			<input
				type="text"
				className="todo-input"
				placeholder="What do you need to do?"
				value={todoInput}
				onChange={handleInput}
			/>
		</form>
	);
};

export default TodoForm;
