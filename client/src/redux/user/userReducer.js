import { createAction, createReducer } from "@reduxjs/toolkit";
// Action types
// const SET_USER = 'user/set'
// const UNSET_USER = 'user/unset'

// Action creators
// export const setUser = user => (
//   { type: SET_USER, payload: user }
// )
export const setUser = createAction("user/set")
// export const unsetUser = () => (
//   { type: UNSET_USER }
// )
export const unsetUser = createAction("user/unset")
// Reducer
const defaultState = {
  currentUser: {},
  isAuth: false,
}
// function userReducer(state = defaultState, action) {
//   switch (action.type) {
//     case SET_USER:
//       return {
//         ...state,
//         currentUser: action.payload,
//         isAuth: true,
//       }
//     case UNSET_USER:
//       return {
//         ...state,
//         currentUser: {},
//         isAuth: false,
//       }
//     default:
//       return state;
//   }
// }
const userReducer = createReducer(defaultState, {
  [setUser]: (state, action) => ({ ...state, currentUser: action.payload, isAuth: true }),
  [unsetUser]: (state,) => ({ ...state, currentUser: {}, isAuth: false }),
})

export default userReducer