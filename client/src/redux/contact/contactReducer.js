import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
const setContacts = createAction("contact/setContacts")
const unsetContacts = createAction("contact/unsetContacts")
const setNewContact = createAction("contact/addNewContact")
const setDisplayPopup = createAction("contact/setDisplayPopup")

const contactAction = { setContacts, unsetContacts, setNewContact, setDisplayPopup }

export default contactAction

// Reducer
const defaultState = {
  contacts: [],
  displayPopup: 'none'
}

export const contactReducer = createReducer(defaultState, {
  [setContacts]: (state, action) => ({ ...state, contacts: action.payload }),
  [unsetContacts]: (state,) => ({ ...state, contacts: [] }),
  [setNewContact]: (state, action) => ({ ...state, contacts: [...state.contacts, action.payload] }),
  [setDisplayPopup]: (state, action) => ({ ...state, displayPopup: action.payload }),
})