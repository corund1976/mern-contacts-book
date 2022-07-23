import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import contactOperation from 'redux/contact/contactOperations'
import contactAction from 'redux/contact/contactReducer'
import contactSelector from 'redux/contact/contactSelectors'

import Contact from 'components/contact'
import Popup from 'components/popup'

import s from './contactsList.module.css'

function ContactsList() {
  const dispatch = useDispatch()
  const totalContacts = useSelector(contactSelector.getTotalContacts)
  const totalPages = useSelector(contactSelector.getTotalPages)
  const pageIndex = useSelector(contactSelector.getPageIndex)
  const contacts = useSelector(contactSelector.getPaginatedContacts)

  const limit = process.env.REACT_APP_PAGINATION_LIMIT

  const [currPage, setCurrPage] = useState(pageIndex)

  useEffect(() => {
    dispatch(contactOperation.paginateContacts({ page: currPage, limit }))
  }, [dispatch, currPage, limit])

  const handlerAddContact = () =>
    dispatch(contactAction.setDisplayPopup('flex'))

  const handlePaginateFirst = () => {
    setCurrPage(1)
  }

  const handlePaginateLast = () => {
    setCurrPage(totalPages)
  }

  const handlePaginatePrev = () => {
    const page = currPage > 1 ? currPage - 1 : 1
    setCurrPage(page)
  }

  const handlePaginateNext = () => {
    const page = currPage < totalPages ? currPage + 1 : totalPages
    setCurrPage(page)
  }

  return (
    <div className={s.contactsList__section}>
      <h2 className={s.contactsList__header}>Contacts List</h2>

      <div className={s.top__wrapper}>
        <div className={s.totalContacts}>Total contacts = {totalContacts}</div>

        <button
          type="button"
          className={s.newContact__button}
          onClick={handlerAddContact}
        >
          + new contact
        </button>
      </div>

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

      <div className={s.pagination}>
        <button
          type="button"
          className={s.pagination__button}
          onClick={handlePaginateFirst}
        >
          FirstPage
        </button>
        <button
          type="button"
          className={s.pagination__button}
          onClick={handlePaginatePrev}
        >
          PrevPage
        </button>
        <button
          type="button"
          className={s.pagination__button}
          onClick={handlePaginateNext}
        >
          NextPage
        </button>
        <button
          type="button"
          className={s.pagination__button}
          onClick={handlePaginateLast}
        >
          LastPage
        </button>
      </div>

      <div className={s.pageIndex}>Page #{pageIndex}</div>

      <Popup />
    </div>
  )
}

export default ContactsList
