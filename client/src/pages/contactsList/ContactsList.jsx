import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import contactOperation from 'redux/contact/contactOperations'
import contactAction from 'redux/contact/contactReducer'
import contactSelector from 'redux/contact/contactSelectors'
import paginationSelector from 'redux/pagination/paginationSelectors'

import Contact from 'components/contact'
import Popup from 'components/popup'

import s from './contactsList.module.css'

function ContactsList() {
  const dispatch = useDispatch()
  const contacts = useSelector(contactSelector.getPaginatedContacts)
  const totalContacts = useSelector(paginationSelector.getTotalContacts)
  const totalPages = useSelector(paginationSelector.getTotalPages)
  const pageIndex = useSelector(paginationSelector.getPageIndex)
  const pagePrev = useSelector(paginationSelector.getPagePrev)
  const pageNext = useSelector(paginationSelector.getPageNext)
  const hasPagePrev = useSelector(paginationSelector.getHasPagePrev)
  const hasPageNext = useSelector(paginationSelector.getHasPageNext)

  const perPageDefault = process.env.REACT_APP_PAGINATION_PER_PAGE

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(perPageDefault)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    dispatch(contactOperation.getContacts({ page, limit, filter }))
  }, [dispatch, page, limit, filter])

  const handleChangeLimit = (e) => {
    setLimit(e.target.value)
    setPage(1)
  }

  const handleChangeFilter = (e) => setFilter(e.target.value)

  const handlerAddContact = () =>
    dispatch(contactAction.setDisplayPopup('flex'))

  const handlePaginateFirst = () => setPage(1)

  const handlePaginateLast = () => setPage(totalPages)

  const handlePaginatePrev = () => hasPagePrev && setPage(pagePrev)

  const handlePaginateNext = () => hasPageNext && setPage(pageNext)

  return (
    <div className={s.contactsList__section}>
      <h2 className={s.contactsList__header}>
        Contacts List ({totalContacts})
      </h2>

      <div className={s.top__wrapper}>
        <div>
          show:
          <label htmlFor="selectLimit">
            <select
              id="selectLimit"
              value={limit}
              onChange={(e) => handleChangeLimit(e)}
              className={s.select__pagination}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="30">30</option>
            </select>
          </label>
        </div>

        <label htmlFor="selectFilter">
          <select
            id="selectFilter"
            value={filter}
            onChange={(e) => handleChangeFilter(e)}
            className={s.select__pagination}
          >
            <option value="">all</option>
            <option value="favorite">favorite</option>
          </select>
        </label>

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
          <Contact contact={contact} key={contact._id} />
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

      <div className={s.pageIndex}>
        page {pageIndex} of {totalPages}
      </div>

      <Popup />
    </div>
  )
}

export default ContactsList
