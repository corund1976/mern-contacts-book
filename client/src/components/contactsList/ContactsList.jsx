import { useDispatch, useSelector } from 'react-redux'
import { FaTrashAlt, FaUserEdit } from 'react-icons/fa'

import contactOperation from 'redux/contact/contactOperations'
import contactSelectors from 'redux/contact/contactSelectors'
import popupAction from 'redux/popup/popupReducer'

import s from './contactsList.module.css'

function ContactsList() {
  const dispatch = useDispatch()
  const contacts = useSelector(contactSelectors.getContacts)

  const handleEditFavorite = (id, update) =>
    dispatch(contactOperation.updateFavorite(id, update))

  const editContact = (contact, contactId) =>
    dispatch(contactOperation.update(contactId, contact))

  const handleEditContact = (id) => {
    dispatch(popupAction.setDisplayPopup('flex'))
    dispatch(popupAction.setFormTitle('Edit contact'))
    dispatch(popupAction.setButtonTitle('Edit contact'))
    dispatch(popupAction.setContactId(id))
    dispatch(popupAction.setSubmitHandler(editContact))
  }

  const handleDeleteContact = (id) => dispatch(contactOperation.remove(id))

  const tableData = contacts.map((contact, index) => (
    <tr key={contact._id ? contact._id : index}>
      <td className={s.first_cell}>
        <div className={s.buttons}>
          <button
            className={s.btn}
            type="button"
            onClick={() => handleDeleteContact(contact._id)}
          >
            <FaTrashAlt size="20" color="red" />
          </button>
          <button
            className={s.btn}
            type="button"
            onClick={() => handleEditContact(contact._id)}
          >
            <FaUserEdit size="20" color="green" />
          </button>
        </div>

        {contact.name}
      </td>
      <td>{contact.phone}</td>
      <td>{contact.email}</td>
      <td>
        <button
          type="button"
          className={s.btn}
          onClick={() =>
            handleEditFavorite(contact._id, {
              favorite: !contact.favorite,
            })
          }
        >
          {contact.favorite ? '+' : '-'}
        </button>
      </td>
    </tr>
  ))

  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>name</th>
          <th>phone</th>
          <th>email</th>
          <th>favorite</th>
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  )
}

export default ContactsList
