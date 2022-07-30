const getContacts = (state) => state.contact.contacts
const getTotalContacts = (state) => state.contact.totalContacts

const getFirstPage = (state) => state.contact.pagination.firstPage
const getPrevPage = (state) => state.contact.pagination.prevPage
const getNextPage = (state) => state.contact.pagination.nextPage
const getLastPage = (state) => state.contact.pagination.lastPage

const getDisplayPopup = (state) => state.contact.displayPopup

export default {
  getContacts,
  getTotalContacts,
  getFirstPage,
  getPrevPage,
  getNextPage,
  getLastPage,
  getDisplayPopup,
}