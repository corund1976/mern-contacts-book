import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
const setUser = createAction("user/setCurrUser")
const unsetUser = createAction("user/unsetCurrUser")
const setAvatar = createAction('user/setAvatar')
const unsetAvatar = createAction('user/unsetAvatar')
const setSubscription = createAction('user/setSubscription')

const userActions = { setUser, unsetUser, setAvatar, unsetAvatar, setSubscription }

export default userActions

// Reducer
const defaultState = {
  currentUser: {},
}

export const userReducer = createReducer(defaultState, {
  [setUser]: (state, action) => ({ ...state, currentUser: action.payload }),
  [unsetUser]: (state,) => ({ ...state, currentUser: {} }),
  [setAvatar]: (state, action) => ({ ...state, currentUser: { ...state.currentUser, avatarURL: action.payload } }),
  [unsetAvatar]: (state, action) => ({ ...state, currentUser: { ...state.currentUser, avatarURL: action.payload } }),
  [setSubscription]: (state, action) => ({ ...state, currentUser: { ...state.currentUser, subscription: action.payload } }),
})
