import { useEffect, useRef, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import './reset.css';
import './index.css';

import NoTodos from './components/NoTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

// const todoData = [];

function App() {
	const [todos, setTodos] = useLocalStorage('todos', []);
	const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);
	const [name, setName] = useLocalStorage('name', '');

	let nameInputRef = useRef();

	// useEffect(() => {
	// 	setTodos(todoData);
	// }, []);

	useEffect(() => {
		nameInputRef.current.focus();
	}, []);

	const handleNameInput = ({ target: { value } }) => {
		setName(value);
	};

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

	const calculateRemainingItems = () => {
		return todos.filter(todo => !todo.isComplete).length;
	};
	const remaining = useMemo(calculateRemainingItems, [todos]);

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
				<div className="name-container">
					<h3>What's your name?</h3>
					<form action="#">
						<input
							type="text"
							ref={nameInputRef}
							className="todo-input"
							placeholder="Type here your name..."
							value={name}
							onChange={handleNameInput}
						/>
					</form>
					{name && (
						<p>
							Hello, <b>{name}</b>
						</p>
					)}
				</div>
				<h2>Todo App</h2>
				<TodoForm addTodo={addTodo} />

				{todos.length > 0 ? (
					<TodoList
						todos={todos}
						completeTodo={completeTodo}
						markAsEditing={markAsEditing}
						updateTodo={updateTodo}
						deleteTodo={deleteTodo}
						remaining={remaining}
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
