import axios from 'axios';

import { setContacts } from './contactReducer';
// eslint-disable-next-line import/prefer-default-export
export const listContacts = () => async dispatch => {
  const token = localStorage.getItem('accessToken')
  try {
    const response = await axios
      .get(
        'http://localhost:5000/contacts',
        { headers: { Authorization: `Bearer ${token}` } }
      )

    const { contacts } = response.data

    // eslint-disable-next-line
    console.log(contacts);

    dispatch(setContacts(contacts))
  } catch (e) {
    // eslint-disable-next-line
    alert(e.response.data.message)
  }
}
