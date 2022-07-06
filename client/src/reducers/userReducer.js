const SET_USER = 'SET_USER'
const UNSET_USER = 'UNSET_USER'

const defaultState = {
  currentUser: {},
  isAuth: false,
}

// eslint-disable-next-line default-param-last
export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload.user,
        isAuth: true,
      }
    case UNSET_USER:
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      }
    default:
      return state;
  }
}

export const setUser = user => (
  { type: SET_USER, payload: user }
)

export const unsetUser = () => (
  { type: UNSET_USER }
)