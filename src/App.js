import { useEffect, useState } from 'react';
import './reset.css';
import './index.css';

import NoTodos from './components/NoTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const todoData = [
	{
		id: 1,
		title: 'Finish React Series',
		isComplete: false,
		isEditing: false,
	},
	{
		id: 2,
		title: 'Go Grocery',
		isComplete: true,
		isEditing: false,
	},
	{
		id: 3,
		title: 'Take over world',
		isComplete: false,
		isEditing: false,
	},
];

function App() {
	const [todos, setTodos] = useState([]);
	const [idForTodo, setIdForTodo] = useState(4);

	useEffect(() => {
		setTodos(todoData);
	}, []);

	const addTodo = title => {
		setTodos([
			...todos,
			{
				id: idForTodo,
				title: title,
				isComplete: false,
			},
		]);

		setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
	};

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

	const identifyRemainingTodoItems = () => {
		return todos.filter(todo => !todo.isComplete).length;
	};

	const clearCompleted = () => {
		setTodos([...todos].filter(todo => !todo.isComplete));
	};

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

	const todosFiltered = filter => {
		switch (filter) {
			case 'active':
				return todos.filter(todo => !todo.isComplete);
			case 'completed':
				return todos.filter(todo => todo.isComplete);
			default:
				return todos;
		}
	};

	return (
		<div className="todo-app-container">
			<div className="todo-app">
				<h2>Todo App</h2>
				<TodoForm addTodo={addTodo} />

				{todos.length > 0 ? (
					<TodoList
						todos={todos}
						completeTodo={completeTodo}
						markAsEditing={markAsEditing}
						updateTodo={updateTodo}
						deleteTodo={deleteTodo}
						remaining={identifyRemainingTodoItems}
						clearCompleted={clearCompleted}
						checkAllTodos={checkAllTodos}
						unCheckAllTodos={unCheckAllTodos}
						todosFiltered={todosFiltered}
					/>
				) : (
					<NoTodos />
				)}
			</div>
		</div>
	);
}

export default App;
