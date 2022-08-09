const getDisplayPopup = (state) => state.popup.displayPopup
const getFormTitle = (state) => state.popup.formTitle
const getButtonTitle = (state) => state.popup.buttonTitle
const getContactId = (state) => state.popup.contactId
const getSubmitHandler = (state) => state.popup.submitHandler

export default {
  getDisplayPopup,
  getFormTitle,
  getButtonTitle,
  getContactId,
  getSubmitHandler,
}