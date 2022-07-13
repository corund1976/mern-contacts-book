import { createAction, createReducer } from "@reduxjs/toolkit";

// Actions
export const setIsAuth = createAction("auth/setIsAuth")
export const unsetIsAuth = createAction("auth/unsetIsAuth")

// Reducer
const defaultState = {
  isAuth: false,
}

const authReducer = createReducer(defaultState, {
  [setIsAuth]: (state,) => ({ ...state, isAuth: true }),
  [unsetIsAuth]: (state,) => ({ ...state, isAuth: false }),
})

export default authReducer