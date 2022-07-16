import { createAction, createReducer } from "@reduxjs/toolkit";
// Action types
// const SET_USER = 'user/set'
// const UNSET_USER = 'user/unset'

// Action creators
// export const setUser = user => (
//   { type: SET_USER, payload: user }
// )
export const setUser = createAction("user/setCurrUser")
// export const unsetUser = () => (
//   { type: UNSET_USER }
// )
export const unsetUser = createAction("user/unsetCurrUser")
export const setAvatar = createAction('user/setAvatar')
export const unsetAvatar = createAction('user/unsetAvatar')
export const setSubscription = createAction('user/setSubscription')

// Reducer
const defaultState = {
  currentUser: {},
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
  [setUser]: (state, action) => ({ ...state, currentUser: action.payload }),
  [unsetUser]: (state,) => ({ ...state, currentUser: {} }),
  [setAvatar]: (state, action) => ({ ...state, currentUser: { ...state.currentUser, avatarURL: action.payload } }),
  [unsetAvatar]: (state, action) => ({ ...state, currentUser: { ...state.currentUser, avatarURL: action.payload } }),
  [setSubscription]: (state, action) => ({ ...state, currentUser: { ...state.currentUser, subscription: action.payload } }),
})

export default userReducer