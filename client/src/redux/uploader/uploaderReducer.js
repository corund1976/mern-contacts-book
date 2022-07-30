import { createAction, createReducer } from "@reduxjs/toolkit";

// Action creators
const setShowUploader = createAction("uploader/setShowUploader")
const setFileName = createAction("uploader/setFileName")
const setFileProgress = createAction("uploader/setFileProgress")
const resetStateUploader = createAction("uploader/resetStateUploader")

export default { setShowUploader, setFileName, setFileProgress, resetStateUploader }

// Reducer
const defaultState = {
  showUploader: false,
  file: {
    name: '',
    progress: 0,
  },
}

export const uploaderReducer = createReducer(defaultState, {
  [setShowUploader]: (state,) => ({ ...state, showUploader: true }),
  [setFileName]: (state, action) => ({
    ...state, file: { ...state.file, name: action.payload }
  }),
  [setFileProgress]: (state, action) => ({
    ...state, file: { ...state.file, progress: action.payload }
  }),
  [resetStateUploader]: () => ({ ...defaultState }),
})
