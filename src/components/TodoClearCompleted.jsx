import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

const TodoClearCompleted = () => {
	const { todos, setTodos } = useContext(TodosContext);

	const clearCompleted = () => {
		setTodos([...todos].filter(todo => !todo.isComplete));
	};

	return (
		<button className="button" onClick={clearCompleted}>
			Clear completed
		</button>
	);
};

export default TodoClearCompleted;
