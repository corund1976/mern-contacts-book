import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
export const setIsLoading = createAction("loader/setIsLoading")
export const unsetIsLoading = createAction("loader/unsetIsLoading")

// Reducer
const defaultState = {
  isLoading: false,
}

const loaderReducer = createReducer(defaultState, {
  [setIsLoading]: (state,) => ({ ...state, isLoading: true }),
  [unsetIsLoading]: (state,) => ({ ...state, isLoading: false }),
})

export default loaderReducer
