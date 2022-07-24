import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
const setTotalContacts = createAction("pagination/setTotalContacts")
const setTotalPages = createAction("pagination/setTotalPages")
const setPageIndex = createAction("pagination/setPageIndex")
const setPagePrev = createAction("pagination/setPagePrev")
const setPageNext = createAction("pagination/setPageNext")
const setHasPrevPage = createAction("pagination/setHasPrevPage")
const setHasNextPage = createAction("pagination/setHasNextPage")

export default {
  setTotalContacts,
  setTotalPages,
  setPageIndex,
  setPagePrev,
  setPageNext,
  setHasPrevPage,
  setHasNextPage,
}

// Reducer
const defaultState = {
  totalContacts: 0,
  totalPages: 0,
  pageIndex: 1,
  pagePrev: 1,
  pageNext: 2,
  hasPrevPage: false,
  hasNextPage: false,
}

export const paginationReducer = createReducer(defaultState, {
  [setTotalContacts]: (state, action) => ({ ...state, totalContacts: action.payload }),
  [setTotalPages]: (state, action) => ({ ...state, totalPages: action.payload }),
  [setPageIndex]: (state, action) => ({ ...state, pageIndex: action.payload }),
  [setPagePrev]: (state, action) => ({ ...state, pagePrev: action.payload }),
  [setPageNext]: (state, action) => ({ ...state, pageNext: action.payload }),
  [setHasPrevPage]: (state, action) => ({ ...state, hasPrevPage: action.payload }),
  [setHasNextPage]: (state, action) => ({ ...state, hasNextPage: action.payload }),
})