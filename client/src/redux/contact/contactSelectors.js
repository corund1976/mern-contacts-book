const getListContacts = (state) => state.contact.contacts
const getDisplayPopup = (state) => state.contact.displayPopup

const contactSelectors = { getListContacts, getDisplayPopup }

export default contactSelectors