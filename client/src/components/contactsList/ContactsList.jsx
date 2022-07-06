import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { listContacts } from '../../actions/contact'

// import s from './contactsList.module.css'

function ContactsList() {
  const dispatch = useDispatch()
  const contacts = useSelector((state) => state.contacts)

  useEffect(() => {
    dispatch(listContacts())
  }, [contacts, dispatch])

  return <div>ContactsList</div>
}

export default ContactsList
