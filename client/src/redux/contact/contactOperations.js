import { Notify } from 'notiflix/build/notiflix-notify-aio';

import contactService from 'services/contactService';
import contactAction from 'redux/contact/contactReducer';

const listContacts = () => async dispatch => {
  try {
    const response = await contactService.listContacts()
    const { contacts } = response.data

    dispatch(contactAction.setContacts(contacts))

    Notify.success(response.data.message)
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

const addContact = newContact => async dispatch => {
  try {
    const response = await contactService.addContact(newContact)
    const { contact } = response.data

    dispatch(contactAction.setNewContact(contact))

    Notify.success(response.data.message)
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

export default { listContacts, addContact }