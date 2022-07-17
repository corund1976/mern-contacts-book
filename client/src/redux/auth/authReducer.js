import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
const setIsAuth = createAction("auth/setIsAuth")
const unsetIsAuth = createAction("auth/unsetIsAuth")

const authAction = { setIsAuth, unsetIsAuth }

export default authAction

// Reducer
const defaultState = {
  isAuth: false,
}

export const authReducer = createReducer(defaultState, {
  [setIsAuth]: (state,) => ({ ...state, isAuth: true }),
  [unsetIsAuth]: (state,) => ({ ...state, isAuth: false }),
})
