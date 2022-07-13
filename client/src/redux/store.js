import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth/authReducer'
import userReducer from './user/userReducer'
import contactReducer from './contact/contactReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contact: contactReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
})

export default store