import axios from 'axios'

import { setContacts, setNewContact } from './contactReducer';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const listContacts = () => async dispatch => {
  try {
    const response = await axios.get('/contacts')

    const { contacts } = response.data

    dispatch(setContacts(contacts))
  } catch (e) {
    // eslint-disable-next-line
    alert(e.response.data.message)
  }
}

export const addContact = newContact => async dispatch => {
  try {
    const response = await axios.post('/contacts', newContact)

    const { contact } = response.data

    dispatch(setNewContact(contact))
  } catch (e) {
    // eslint-disable-next-line
    alert(e.response.data.message)
  }
}
