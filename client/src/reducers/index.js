import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import contactReducer from './contactReducer'

const rootReducer = combineReducers({
  user: userReducer,
  contacts: contactReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})