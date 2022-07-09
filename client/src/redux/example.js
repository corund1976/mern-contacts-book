import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";

// Action types
// const INCREMENT = "timer/increment";
// const DECREMENT = "timer/decrement";

// Action creators
// function increment(value) {
//   return { type: INCREMENT, payload: value, };
// }
const increment = createAction("timer/increment");

// function decrement(value) {
//   return { type: DECREMENT, payload: value, };
// }
const decrement = createAction("timer/decrement");

// Reducer
// function timer(state = 0, action) {
//   switch (action.type) {
//     case INCREMENT:
//       return state + action.payload;

//     case DECREMENT:
//       return state - action.payload;

//     default:
//       return state;
//   }
// }
const timer = createReducer(0, {
  [increment]: (state, action) => state + action.payload,
  [decrement]: (state, action) => state - action.payload,
});


// Store
export const store = configureStore({
  reducer: {
    timer,
  }
});
