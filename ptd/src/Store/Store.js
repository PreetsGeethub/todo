import {configureStore} from '@reduxjs/toolkit'
import todoReducer from '../components/features/todoSlice'
import reducer from '../components/features/todoSlice'
export const store = configureStore({
    reducer:todoReducer
})