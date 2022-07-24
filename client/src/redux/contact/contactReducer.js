import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
const setAllContacts = createAction("contact/setAllContacts")
const unsetAllContacts = createAction("contact/unsetAllContacts")
const setPaginatedContacts = createAction("contact/setPaginatedContacts")
const unsetPaginatedContacts = createAction("contact/unsetPaginatedContacts")
const setNewContact = createAction("contact/addNewContact")
const setDisplayPopup = createAction("contact/setDisplayPopup")

export default {
  setAllContacts,
  unsetAllContacts,
  setPaginatedContacts,
  unsetPaginatedContacts,
  setNewContact,
  setDisplayPopup
}

// Reducer
const defaultState = {
  allContacts: [],
  paginatedContacts: [],
  displayPopup: 'none'
}

export const contactReducer = createReducer(defaultState, {
  [setAllContacts]: (state, action) => ({ ...state, allContacts: action.payload }),
  [unsetAllContacts]: (state,) => ({ ...state, allContacts: [] }),
  [setPaginatedContacts]: (state, action) => ({ ...state, paginatedContacts: action.payload }),
  [unsetPaginatedContacts]: (state,) => ({ ...state, paginatedContacts: [] }),
  [setNewContact]: (state, action) => ({ ...state, contacts: [...state.contacts, action.payload] }),
  [setDisplayPopup]: (state, action) => ({ ...state, displayPopup: action.payload }),
})