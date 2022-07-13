import { createAction, createReducer } from "@reduxjs/toolkit";
// Action types
// const SET_CONTACTS = 'contacts/set'
// const UNSET_CONTACTS = 'contacts/unset'

// Action creators
// export const setContacts = contacts => (
//   { type: SET_CONTACTS, payload: contacts }
//   )
export const setContacts = createAction("contact/setContacts")
// export const unsetContacts = () => (
//   { type: UNSET_CONTACTS }
// )
export const unsetContacts = createAction("contact/unsetContacts")
export const setNewContact = createAction("contact/addNewContact")
export const setDisplayPopup = createAction("contact/setDisplayPopup")
// Reducer
const defaultState = {
  contacts: [],
  displayPopup: 'none'
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
  [setNewContact]: (state, action) => ({ ...state, contacts: [...state.contacts, action.payload] }),
  [setDisplayPopup]: (state, action) => ({ ...state, displayPopup: action.payload }),
})

export default contactReducer