import { useState, useEffect, useRef } from 'react';
import { TodosContext } from './context/TodosContext';
import { useLocalStorage } from './hooks/useLocalStorage';

import './reset.css';
import './index.css';

import NoTodos from './components/NoTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
	const [todos, setTodos] = useLocalStorage('todos', []);
	const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);
	const [name, setName] = useLocalStorage('name', '');
	const [filter, setFilter] = useState('all');

	let nameInputRef = useRef();

	useEffect(() => {
		nameInputRef.current.focus();
	}, []);

	const handleNameInput = ({ target: { value } }) => {
		setName(value);
	};

	const todosFiltered = () => {
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
		<TodosContext.Provider
			value={{
				todos,
				setTodos,
				idForTodo,
				setIdForTodo,
				todosFiltered,
				filter,
				setFilter,
			}}>
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
					<TodoForm />

					{todos.length > 0 ? <TodoList /> : <NoTodos />}
				</div>
			</div>
		</TodosContext.Provider>
	);
}

export default App;
