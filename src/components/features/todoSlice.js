import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [
        { id: 1, todo: "hello world", completed: false }
    ]
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                todo: action.payload,
                completed: false,
            };
            state.todos.push(todo);
        },
        updateTodo: (state, action) => {
            const todo = state.todos.find((t) => t.id === action.payload.id);
            if (todo) {
                todo.todo = action.payload.text;
            }
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
        },
        toggleComplete: (state, action) => {
            const todo = state.todos.find((t) => t.id === action.payload.id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        setTodos: (state, action) => {
            state.todos = action.payload;
        }
    }
});

export const { addTodo, updateTodo, removeTodo, toggleComplete, setTodos} = todoSlice.actions;
export default todoSlice.reducer;
