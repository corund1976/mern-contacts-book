import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { authReducer } from 'redux/auth/authReducer'
import { userReducer } from 'redux/user/userReducer'
import { contactReducer } from 'redux/contact/contactReducer'
import { popupReducer } from 'redux/popup/popupReducer'
import { uploaderReducer } from 'redux/uploader/uploaderReducer'

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contact: contactReducer,
    popup: popupReducer,
    uploader: uploaderReducer,
  },
  middleware: customizedMiddleware,
  devTools: process.env.NODE_ENV === 'development',
})

export default store