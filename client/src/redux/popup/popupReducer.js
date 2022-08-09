import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
const setDisplayPopup = createAction("popup/setDisplayPopup")

const setFormTitle = createAction("popup/setFormTitle")
const setButtonTitle = createAction("popup/setButtonTitle")
const setContactId = createAction("popup/setContactId")
const setSubmitHandler = createAction("popup/setSubmitHandler")

const resetStatePopup = createAction("popup/resetStatePopup")

export default {
  setDisplayPopup,
  setFormTitle,
  setButtonTitle,
  setContactId,
  setSubmitHandler,
  resetStatePopup,
}

// Reducer
const defaultState = {
  displayPopup: 'none',
  formTitle: '',
  buttonTitle: '',
  contactId: '',
  submitHandler: '',
}

export const popupReducer = createReducer(defaultState, {
  [setDisplayPopup]: (state, action) => ({
    ...state,
    displayPopup: action.payload
  }),

  [setFormTitle]: (state, action) => ({
    ...state,
    formTitle: action.payload
  }),
  [setButtonTitle]: (state, action) => ({
    ...state,
    buttonTitle: action.payload
  }),
  [setContactId]: (state, action) => ({
    ...state,
    contactId: action.payload
  }),

  [setSubmitHandler]: (state, action) => ({
    ...state,
    submitHandler: action.payload,
  }),

  [resetStatePopup]: () => ({ ...defaultState }),
})