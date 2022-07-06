const SET_CONTACTS = 'SET_CONTACTS'

const defaultState = {
  contacts: [],
}

// eslint-disable-next-line default-param-last
export default function contactReducer(state = defaultState, action,) {
  switch (action.type) {
    case SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      }
    default:
      return state;
  }
}

export const setContacts = (contacts) => (
  { type: SET_CONTACTS, payload: contacts }
)

