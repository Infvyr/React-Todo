import { useState } from 'react';
import PropTypes from 'prop-types';

const TodoForm = ({ addTodo }) => {
	const [todoInput, setTodoInput] = useState('');

	const handleInput = ({ target }) => {
		setTodoInput(target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (todoInput.trim().length === 0) return;

		addTodo(todoInput);
		setTodoInput('');
	};

	return (
		<form action="#" onSubmit={handleSubmit}>
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

TodoForm.propTypes = {
	addTodo: PropTypes.func.isRequired,
};

export default TodoForm;
