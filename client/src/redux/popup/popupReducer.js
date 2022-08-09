import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
const setDisplayPopup = createAction("popup/setDisplayPopup")

const setFormTitle = createAction("popup/setFormTitle")
const setButtonTitle = createAction("popup/setButtonTitle")
const setContactToEdit = createAction("popup/setContactToEdit")
const setSubmitHandler = createAction("popup/setSubmitHandler")

const resetStatePopup = createAction("popup/resetStatePopup")

export default {
  setDisplayPopup,
  setFormTitle,
  setButtonTitle,
  setContactToEdit,
  setSubmitHandler,
  resetStatePopup,
}

// Reducer
const defaultState = {
  displayPopup: 'none',
  formTitle: '',
  buttonTitle: '',
  contact: {
    id: '',
    name: '',
    email: '',
    phone: ''
  },
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
  [setContactToEdit]: (state, action) => ({
    ...state,
    contact: {
      ...state.contact,
      id: action.payload._id,
      name: action.payload.name,
      email: action.payload.email,
      phone: action.payload.phone,
    }
  }),

  [setSubmitHandler]: (state, action) => ({
    ...state,
    submitHandler: action.payload,
  }),

  [resetStatePopup]: () => ({ ...defaultState }),
})