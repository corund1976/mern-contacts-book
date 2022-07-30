import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
const setUser = createAction("user/setUser")
const setAvatar = createAction('user/setAvatar')
const unsetAvatar = createAction('user/unsetAvatar')
const setSubscription = createAction('user/setSubscription')
const resetStateUser = createAction("user/resetStateUser")

export default { setUser, resetStateUser, setAvatar, unsetAvatar, setSubscription }

// Reducer
const defaultState = {
  id: '',
  email: '',
  subscription: '',
  avatarURL: '',
  role: '',
  verified: false,
}

export const userReducer = createReducer(defaultState, {
  [setUser]: (state, action) => ({ ...action.payload }),
  [setAvatar]: (state, action) => ({ ...state, avatarURL: action.payload }),
  [unsetAvatar]: (state, action) => ({ ...state, avatarURL: action.payload }),
  [setSubscription]: (state, action) => ({ ...state, subscription: action.payload }),
  [resetStateUser]: () => ({ ...defaultState }),
})
