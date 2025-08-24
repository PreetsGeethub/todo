import { useState, useEffect, useRef } from 'react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { store } from './store/store'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { setTodos } from './components/features/todoSlice'

function TodoApp() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch()
  const isFirstRun = useRef(true); // Track first run

  // Load todos from localStorage on mount
  useEffect(() => {
    const todosFromStorage = localStorage.getItem("todos");
    
    if (todosFromStorage) {
      try {
        const parsedTodos = JSON.parse(todosFromStorage);
        if (parsedTodos && Array.isArray(parsedTodos)) {
          dispatch(setTodos(parsedTodos));
        }
      } catch (error) {
        console.error("Error loading todos:", error);
      }
    }
  }, [dispatch])

  // Save todos to localStorage (skip first run)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false; // Skip first save
      return;
    }
    
    console.log("Saving todos:", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
          <TodoForm />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {todos.map((todo) => (
            <div key={todo.id} className='w-full'>
              <TodoItem todo={todo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Provider store={store}>
      <TodoApp />
    </Provider>
  )
}

export default App