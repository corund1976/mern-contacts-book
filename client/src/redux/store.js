import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from 'redux/auth/authReducer'
import { userReducer } from 'redux/user/userReducer'
import { contactReducer } from 'redux/contact/contactReducer'
import { paginationReducer } from 'redux/pagination/paginationReducer'
import { loaderReducer } from 'redux/loader/loaderReducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contact: contactReducer,
    pagination: paginationReducer,
    loader: loaderReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
})

export default store