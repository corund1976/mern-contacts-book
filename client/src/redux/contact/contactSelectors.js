const getAllContacts = (state) => state.contact.allContacts
const getPaginatedContacts = (state) => state.contact.paginatedContacts
const getTotalContacts = (state) => state.contact.totalContacts
const getTotalPages = (state) => state.contact.totalPages
const getPageIndex = (state) => state.contact.pageIndex
const getDisplayPopup = (state) => state.contact.displayPopup

export default {
  getAllContacts,
  getPaginatedContacts,
  getTotalContacts,
  getTotalPages,
  getPageIndex,
  getDisplayPopup,
}