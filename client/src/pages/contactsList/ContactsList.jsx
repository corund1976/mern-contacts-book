import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import contactOperation from 'redux/contact/contactOperations'
import contactAction from 'redux/contact/contactReducer'
import contactSelectors from 'redux/contact/contactSelectors'

import Contact from 'components/contact'
import Popup from 'components/popup'

import s from './contactsList.module.css'

function ContactsList() {
  const dispatch = useDispatch()
  const contacts = useSelector(contactSelectors.getListContacts)

  useEffect(() => {
    dispatch(contactOperation.listContacts())
  }, [dispatch])

  const handlerAddContact = () =>
    dispatch(contactAction.setDisplayPopup('flex'))

  return (
    <div className={s.contactsList__section}>
      <h2 className={s.contactsList__header}>Contacts List</h2>
      <button
        type="button"
        className={s.newContact__button}
        onClick={handlerAddContact}
      >
        + new contact
      </button>
      <div className={s.tableHeader}>
        <div>--name--</div>
        <div>--phone--</div>
        <div>--email--</div>
        <div>--favorite--</div>
      </div>
      {contacts.length &&
        contacts.map((contact) => (
          <Contact contact={contact} key={contact.id} />
        ))}
      <Popup />
    </div>
  )
}

export default ContactsList
