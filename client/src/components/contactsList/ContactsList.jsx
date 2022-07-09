import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { listContacts } from '../../redux/contact/contactActions'

// import s from './contactsList.module.css'

function ContactsList() {
  const dispatch = useDispatch()
  const contacts = useSelector((state) => state.contacts)
  // eslint-disable-next-line
  console.log(contacts)

  useEffect(() => {
    dispatch(listContacts())
  }, [dispatch])

  // const data = React.useMemo(() => contacts, [contacts])

  // console.log(data)

  return <div>ContactsList </div>
}

export default ContactsList
