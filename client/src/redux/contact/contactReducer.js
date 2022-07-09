import { createAction, createReducer } from "@reduxjs/toolkit";
// Action types
// const SET_CONTACTS = 'contacts/set'
// const UNSET_CONTACTS = 'contacts/unset'

// Action creators
// export const setContacts = contacts => (
//   { type: SET_CONTACTS, payload: contacts }
//   )
export const setContacts = createAction("contacts/set")
// export const unsetContacts = () => (
//   { type: UNSET_CONTACTS }
// )
export const unsetContacts = createAction("contacts/unset")

// Reducer
const defaultState = {
  contacts: [],
}
// function contactReducer(state = defaultState, action) {
//   switch (action.type) {
//     case SET_CONTACTS:
//       return {
//         ...state,
//         contacts: action.payload,
//       }
//     case UNSET_CONTACTS:
//       return {
//         ...state,
//         contacts: {},
//       }
//     default:
//       return state;
//   }
// }
const contactReducer = createReducer(defaultState, {
  [setContacts]: (state, action) => ({ ...state, contacts: action.payload }),
  [unsetContacts]: (state,) => ({ ...state, contacts: {} }),
})

export default contactReducer