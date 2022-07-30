import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
const setContacts = createAction("contact/setContacts")
const setTotalContacts = createAction("contact/setTotalContacts")

const addContact = createAction("contact/addContact")
const updateContact = createAction("contact/updateContact")
const removeContact = createAction("contact/removeContact")

const setFirstPage = createAction("pagination/setFirstPage")
const setPrevPage = createAction("pagination/setPrevPage")
const setNextPage = createAction("pagination/setNextPage")
const setLastPage = createAction("pagination/setLastPage")

const setDisplayPopup = createAction("contact/setDisplayPopup")

const resetStateContact = createAction("contact/resetStateContact")

export default {
  setContacts,
  setTotalContacts,
  addContact,
  updateContact,
  removeContact,
  setFirstPage,
  setPrevPage,
  setNextPage,
  setLastPage,
  setDisplayPopup,
  resetStateContact,
}

// Reducer
const defaultState = {
  contacts: [{}],
  totalContacts: 0,
  pagination: {},
  displayPopup: 'none'
}

export const contactReducer = createReducer(defaultState, {
  [setContacts]: (state, action) => ({
    ...state,
    contacts: action.payload
  }),
  [setTotalContacts]: (state, action) => ({
    ...state,
    totalContacts: action.payload
  }),

  [addContact]: (state, action) => ({
    ...state,
    contacts: [...state.contacts, action.payload],
  }),
  [updateContact]: (state, action) => ({
    ...state,
    contacts: [...state.contacts.filter(contact => contact._id !== action.payload._id), action.payload]
  }),
  [removeContact]: (state, action) => ({
    ...state,
    contacts: [...state.contacts.filter(contact => contact._id !== action.payload)],
  }),

  [setFirstPage]: (state, action) => ({
    ...state,
    pagination: { ...state.pagination, firstPage: action.payload }
  }),
  [setPrevPage]: (state, action) => ({
    ...state,
    pagination: { ...state.pagination, prevPage: action.payload }
  }),
  [setNextPage]: (state, action) => ({
    ...state,
    pagination: { ...state.pagination, nextPage: action.payload }
  }),
  [setLastPage]: (state, action) => ({
    ...state,
    pagination: { ...state.pagination, lastPage: action.payload }
  }),

  [setDisplayPopup]: (state, action) => ({
    ...state,
    displayPopup: action.payload
  }),

  [resetStateContact]: () => ({ ...defaultState }),
})