import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
const setTotalContacts = createAction("pagination/setTotalContacts")
const setTotalPages = createAction("pagination/setTotalPages")
const setPageIndex = createAction("pagination/setPageIndex")
const setPagePrev = createAction("pagination/setPagePrev")
const setPageNext = createAction("pagination/setPageNext")
const setHasPagePrev = createAction("pagination/setHasPagePrev")
const setHasPageNext = createAction("pagination/setHasPageNext")

export default {
  setTotalContacts,
  setTotalPages,
  setPageIndex,
  setPagePrev,
  setPageNext,
  setHasPagePrev,
  setHasPageNext,
}

// Reducer
const defaultState = {
  totalContacts: 0,
  totalPages: 0,
  pageIndex: 1,
  pagePrev: 1,
  pageNext: 2,
  hasPagePrev: false,
  hasPageNext: true,
}

export const paginationReducer = createReducer(defaultState, {
  [setTotalContacts]: (state, action) => ({ ...state, totalContacts: action.payload }),
  [setTotalPages]: (state, action) => ({ ...state, totalPages: action.payload }),
  [setPageIndex]: (state, action) => ({ ...state, pageIndex: action.payload }),
  [setPagePrev]: (state, action) => ({ ...state, pagePrev: action.payload }),
  [setPageNext]: (state, action) => ({ ...state, pageNext: action.payload }),
  [setHasPagePrev]: (state, action) => ({ ...state, hasPagePrev: action.payload }),
  [setHasPageNext]: (state, action) => ({ ...state, hasPageNext: action.payload }),
})