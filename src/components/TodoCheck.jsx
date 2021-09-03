import { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

const TodoCheckAll = () => {
	const { todos, setTodos } = useContext(TodosContext);

	const checkAllTodos = () => {
		const updatedTodos = todos.map(todo => {
			todo.isComplete = true;
			return todo;
		});

		setTodos(updatedTodos);
	};

	const unCheckAllTodos = () => {
		const updatedTodos = todos.map(todo => {
			todo.isComplete = false;
			return todo;
		});

		setTodos(updatedTodos);
	};

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

export default TodoCheckAll;
