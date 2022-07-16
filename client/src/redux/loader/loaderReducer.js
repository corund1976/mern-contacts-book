import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
const setIsLoading = createAction("loader/setIsLoading")
const unsetIsLoading = createAction("loader/unsetIsLoading")

export const loaderActions = { setIsLoading, unsetIsLoading }

// Reducer
const defaultState = {
  isLoading: false,
}

export const loaderReducer = createReducer(defaultState, {
  [setIsLoading]: (state,) => ({ ...state, isLoading: true }),
  [unsetIsLoading]: (state,) => ({ ...state, isLoading: false }),
})
