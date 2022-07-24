import { Notify } from 'notiflix/build/notiflix-notify-aio';

import contactService from 'services/contactService';
import contactAction from 'redux/contact/contactReducer';
import paginationAction from 'redux/pagination/paginationReducer'

const listContacts = () => async dispatch => {
  try {
    const response = await contactService.listContacts()
    const { contacts } = response.data

    dispatch(contactAction.setAllContacts(contacts))

    Notify.success(response.data.message)
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

const getContacts = (params) => async dispatch => {
  try {
    const response = await contactService.getContacts(params)
    const { contacts } = response.data

    const totalContacts = JSON.parse(response.headers["x-total-count"])
    const totalPages = JSON.parse(response.headers["x-total-pages"])
    const pageIndex = JSON.parse(response.headers["x-page-index"])
    const prevPage = JSON.parse(response.headers["x-page-prev"])
    const nextPage = JSON.parse(response.headers["x-page-next"])
    const hasPrevPage = JSON.parse(response.headers["x-has-page-prev"])
    const hasNextPage = JSON.parse(response.headers["x-has-page-next"])

    dispatch(contactAction.setPaginatedContacts(contacts))

    dispatch(paginationAction.setTotalContacts(totalContacts))
    dispatch(paginationAction.setTotalPages(totalPages))
    dispatch(paginationAction.setPageIndex(pageIndex))
    dispatch(paginationAction.setPagePrev(prevPage))
    dispatch(paginationAction.setPageNext(nextPage))
    dispatch(paginationAction.setHasPagePrev(hasPrevPage))
    dispatch(paginationAction.setHasPageNext(hasNextPage))

    Notify.success(response.data.message)
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
};

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

export default { listContacts, getContacts, addContact }