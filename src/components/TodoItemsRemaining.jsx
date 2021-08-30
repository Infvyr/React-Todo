import { useContext, useMemo } from 'react';
import { TodosContext } from '../context/TodosContext';

const TodoItemsRemaining = () => {
	const { todos } = useContext(TodosContext);

	const calculateRemainingItems = () => {
		return todos.filter(todo => !todo.isComplete).length;
	};
	const remaining = useMemo(calculateRemainingItems, [todos]);

	return <span>{remaining} items remaining</span>;
};

export default TodoItemsRemaining;
