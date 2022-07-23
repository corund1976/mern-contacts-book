import { Notify } from 'notiflix/build/notiflix-notify-aio';

import contactService from 'services/contactService';
import contactAction from 'redux/contact/contactReducer';

const listContacts = () => async dispatch => {
  try {
    const response = await contactService.listAllContacts()
    const { contacts } = response.data

    dispatch(contactAction.setAllContacts(contacts))

    Notify.success(response.data.message)
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

const paginateContacts = (paginateParams) => async dispatch => {
  try {
    const response = await contactService.paginateContacts(paginateParams)
    const { contacts } = response.data

    const totalContacts = Number(response.headers["x-total-count"])
    const totalPages = Number(response.headers["x-total-pages"])
    const pageIndex = Number(response.headers["x-page-index"])

    dispatch(contactAction.setTotalContacts(totalContacts))
    dispatch(contactAction.setTotalPages(totalPages))
    dispatch(contactAction.setPageIndex(pageIndex))
    dispatch(contactAction.setPaginatedContacts(contacts))

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

export default { listContacts, paginateContacts, addContact }