import { configureStore } from '@reduxjs/toolkit'

import userReducer from './user/userReducer'
import contactReducer from './contact/contactReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    contact: contactReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
})

export default store