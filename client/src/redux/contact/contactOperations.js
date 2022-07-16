import { Notify } from 'notiflix/build/notiflix-notify-aio';

import contactService from 'services/contactService';
import { setContacts, setNewContact } from 'redux/contact/contactReducer';
import { loaderActions } from 'redux/loader/loaderReducer'

export const listContacts = () => async dispatch => {
  dispatch(loaderActions.setIsLoading())
  try {
    const response = await contactService.listContacts()
    const { contacts } = response.data

    dispatch(setContacts(contacts))
    Notify.success(response.data.message)
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  } finally {
    dispatch(loaderActions.unsetIsLoading())
  }
}

export const addContact = newContact => async dispatch => {
  try {
    const response = await contactService.addContact(newContact)

    const { contact } = response.data

    dispatch(setNewContact(contact))

    Notify.success(response.data.message)
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}
