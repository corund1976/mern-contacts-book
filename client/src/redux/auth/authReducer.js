import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
const setIsAuth = createAction("auth/setIsAuth")
const resetStateAuth = createAction("auth/resetStateAuth")

export default { setIsAuth, resetStateAuth }

// Reducer
const defaultState = {
  isAuth: false,
}

export const authReducer = createReducer(defaultState, {
  [setIsAuth]: (state,) => ({ ...state, isAuth: true }),
  [resetStateAuth]: () => ({ ...defaultState }),
})
