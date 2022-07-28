import { parseLinkHeader } from '@web3-storage/parse-link-header'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import contactService from 'services/contactService';
import contactAction from 'redux/contact/contactReducer';

const getList = (params) => async dispatch => {
  try {
    const response = await contactService.getList(params)

    const { contacts } = response.data
    dispatch(contactAction.setContacts(contacts))

    const totalContacts = JSON.parse(response.headers["x-total-count"])
    dispatch(contactAction.setTotalContacts(totalContacts))

    const linkHeader = response.headers.link
    const parsed = parseLinkHeader(linkHeader)
    const { first, prev, next, last } = parsed
    dispatch(contactAction.setFirstPage(first.page))
    dispatch(contactAction.setPrevPage(prev.page))
    dispatch(contactAction.setNextPage(next.page))
    dispatch(contactAction.setLastPage(last.page))
    // {
    //  {first:
    //     {filter: ""}
    //     {limit: "5"}
    //     {page: "1"}
    //     {rel: "first"}
    //     {sort: ""}
    //     {url: "http://localhost:5000/contacts?page=1&limit=5&filter=&sort=" }}
    //  {last: { page: '3', limit: '5', filter: '', sort: '', rel: 'last', … }}
    //  {next: { page: '2', limit: '5', filter: '', sort: '', rel: 'next', … }}
    //  {prev: { page: '1', limit: '5', filter: '', sort: '', rel: 'prev', … }}
    // }
    Notify.success(response.data.message)
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

const getById = async (contactId) => {
  try {
    const response = await contactService.getById(contactId)

    const { contact } = response.data
    // eslint-disable-next-line
    console.log('contact = ', contact);

    Notify.success(response.data.message)
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request failure")
  }
}

const add = (newContact) => async dispatch => {
  try {
    const response = await contactService.add(newContact)
    const { contact } = response.data

    dispatch(contactAction.addContact(contact))

    Notify.success(response.data.message)
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request AddContact failure")
  }
}

const update = (contactId, updateData) => async dispatch => {
  try {
    const response = await contactService.update(contactId, updateData)
    const { updatedContact } = response.data

    dispatch(contactAction.updateContact(updatedContact))

    Notify.success(response.data.message)
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request EditContact failure")
  }
}

const updateFavorite = (contactId, updateData) => async dispatch => {
  try {
    const response = await contactService.updateFavorite(contactId, updateData)
    const { updatedContact } = response.data

    dispatch(contactAction.updateContact(updatedContact))

    Notify.success(response.data.message)
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request UpdateFavorite failure")
  }
}

const remove = (contactId) => async dispatch => {
  try {
    const response = await contactService.remove(contactId)

    dispatch(contactAction.removeContact(contactId))

    Notify.success(response.data.message)
  } catch (e) {
    Notify.failure(e.response?.data?.message || "Request RemoveContact failure")
  }
}

export default { getList, getById, add, update, updateFavorite, remove }