import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from 'redux/auth/authReducer'
import { userReducer } from 'redux/user/userReducer'
import { contactReducer } from 'redux/contact/contactReducer'
import { loaderReducer } from 'redux/loader/loaderReducer'

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