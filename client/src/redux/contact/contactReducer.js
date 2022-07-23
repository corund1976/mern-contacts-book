import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
const setAllContacts = createAction("contact/setAllContacts")
const unsetAllContacts = createAction("contact/unsetAllContacts")
const setPaginatedContacts = createAction("contact/setPaginatedContacts")
const unsetPaginatedContacts = createAction("contact/unsetPaginatedContacts")
const setTotalContacts = createAction("contact/setTotalContacts")
const setTotalPages = createAction("contact/setTotalPages")
const setPageIndex = createAction("contact/setPageIndex")
const setNewContact = createAction("contact/addNewContact")
const setDisplayPopup = createAction("contact/setDisplayPopup")

export default {
  setAllContacts,
  unsetAllContacts,
  setPaginatedContacts,
  unsetPaginatedContacts,
  setTotalContacts,
  setTotalPages,
  setPageIndex,
  setNewContact,
  setDisplayPopup
}

// Reducer
const defaultState = {
  allContacts: [],
  paginatedContacts: [],
  totalContacts: 0,
  totalPages: 0,
  pageIndex: 0,
  displayPopup: 'none'
}

export const contactReducer = createReducer(defaultState, {
  [setAllContacts]: (state, action) => ({ ...state, allContacts: action.payload }),
  [unsetAllContacts]: (state,) => ({ ...state, allContacts: [] }),
  [setPaginatedContacts]: (state, action) => ({ ...state, paginatedContacts: action.payload }),
  [unsetPaginatedContacts]: (state,) => ({ ...state, paginatedContacts: [] }),
  [setTotalContacts]: (state, action) => ({ ...state, totalContacts: action.payload }),
  [setTotalPages]: (state, action) => ({ ...state, totalPages: action.payload }),
  [setPageIndex]: (state, action) => ({ ...state, pageIndex: action.payload }),
  [setNewContact]: (state, action) => ({ ...state, contacts: [...state.contacts, action.payload] }),
  [setDisplayPopup]: (state, action) => ({ ...state, displayPopup: action.payload }),
})