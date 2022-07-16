import { configureStore } from '@reduxjs/toolkit'

import authReducer from './auth/authReducer'
import userReducer from './user/userReducer'
import contactReducer from './contact/contactReducer'
import loaderReducer from './loader/loaderReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contact: contactReducer,
    loader: loaderReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
})

export default store