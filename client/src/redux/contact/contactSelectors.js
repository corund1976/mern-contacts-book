const getListContacts = (state) => state.contact.contacts
const getDisplayPopup = (state) => state.contact.displayPopup

const contactSelector = { getListContacts, getDisplayPopup }

export default contactSelector