import { useDispatch, useSelector } from 'react-redux'

import contactOperation from 'redux/contact/contactOperations'
import contactSelectors from 'redux/contact/contactSelectors'

import Contact from 'components/contact'

function ContactsList() {
  const dispatch = useDispatch()
  const contacts = useSelector(contactSelectors.getContacts)

  const handleEditFavorite = (id, update) =>
    dispatch(contactOperation.updateFavorite(id, update))

  const handleDeleteContact = (id) => dispatch(contactOperation.remove(id))

  const listItems = contacts.map((contact, index) => (
    <li key={contact._id ? contact._id : index}>
      <Contact
        contact={contact}
        onEdit={handleEditFavorite}
        onDelete={handleDeleteContact}
      />
    </li>
  ))

  return <ul>{listItems}</ul>
}

export default ContactsList
