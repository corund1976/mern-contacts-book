import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
const setIsAuth = createAction("auth/setIsAuth")
const unsetIsAuth = createAction("auth/unsetIsAuth")

export default { setIsAuth, unsetIsAuth }

// Reducer
const defaultState = {
  isAuth: false,
}

export const authReducer = createReducer(defaultState, {
  [setIsAuth]: (state,) => ({ ...state, isAuth: true }),
  [unsetIsAuth]: (state,) => ({ ...state, isAuth: false }),
})
