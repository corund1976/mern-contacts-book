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
  const hasPrevPage = useSelector(paginationSelector.getHasPrevPage)
  const hasNextPage = useSelector(paginationSelector.getHasNextPage)

  const perPageDefault = process.env.REACT_APP_PAGINATION_PER_PAGE

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(perPageDefault)
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('')

  useEffect(() => {
    dispatch(contactOperation.getContacts({ page, limit, filter, sort }))
  }, [dispatch, page, limit, filter, sort])

  const handleChangeLimit = (e) => {
    setLimit(e.target.value)
    setPage(1)
  }

  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
    setPage(1)
  }

  const handleChangeSort = (e) => {
    setSort(e.target.value)
    setPage(1)
  }

  const handlerAddContact = () =>
    dispatch(contactAction.setDisplayPopup('flex'))

  const handlePageFirst = () => setPage(1)

  const handlePageLast = () => setPage(totalPages)

  const handlePagePrev = () => hasPrevPage && setPage(pagePrev)

  const handlePageNext = () => hasNextPage && setPage(pageNext)

  return (
    <div className={s.contactsList__section}>
      <h2 className={s.contactsList__header}>
        Contacts List (total {totalContacts})
      </h2>

      <div className={s.top__wrapper}>
        <button
          type="button"
          className={s.newContact__button}
          onClick={handlerAddContact}
        >
          + new contact
        </button>

        <ul className={s.top__btns}>
          <li className={s.select__top_btns}>
            per page:
            <label htmlFor="selectLimit">
              <select
                id="selectLimit"
                value={limit}
                onChange={(e) => handleChangeLimit(e)}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="30">30</option>
              </select>
            </label>
          </li>
          <li className={s.select__top_btns}>
            show:
            <label htmlFor="selectFilter">
              <select
                id="selectFilter"
                value={filter}
                onChange={(e) => handleChangeFilter(e)}
              >
                <option value="">all</option>
                <option value="favorite">favorite</option>
              </select>
            </label>
          </li>
          <li className={s.select__top_btns}>
            sort by:
            <label htmlFor="selectSort">
              <select
                id="selectSort"
                value={sort}
                onChange={(e) => handleChangeSort(e)}
              >
                <option value="email">email</option>
                <option value="name">name</option>
                <option value="">no sort</option>
              </select>
            </label>
          </li>
        </ul>
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

      <ul className={s.pagination}>
        <li>
          <button
            type="button"
            className={s.pagination__button}
            onClick={handlePageFirst}
          >
            first
          </button>
        </li>
        <li>
          <button
            type="button"
            className={s.pagination__button}
            onClick={handlePagePrev}
          >
            prev
          </button>
        </li>
        <li>
          <button
            type="button"
            className={s.pagination__button}
            onClick={handlePageNext}
          >
            next
          </button>
        </li>
        <li>
          <button
            type="button"
            className={s.pagination__button}
            onClick={handlePageLast}
          >
            last
          </button>
        </li>
      </ul>

      <div className={s.pageIndex}>
        page {pageIndex} of {totalPages}
      </div>

      <Popup />
    </div>
  )
}

export default ContactsList
