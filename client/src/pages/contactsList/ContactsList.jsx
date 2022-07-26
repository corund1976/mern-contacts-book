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

  const contacts = useSelector(contactSelector.getContacts)
  const totalContacts = useSelector(contactSelector.getTotalContacts)
  const firstPage = useSelector(contactSelector.getFirstPage)
  const prevPage = useSelector(contactSelector.getPrevPage)
  const nextPage = useSelector(contactSelector.getNextPage)
  const lastPage = useSelector(contactSelector.getLastPage)

  const limitDefault = process.env.REACT_APP_PAGINATION_PER_PAGE

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(limitDefault)
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('')

  useEffect(() => {
    dispatch(contactOperation.getContacts({ page, limit, filter, sort }))
  }, [dispatch, page, limit, filter, sort])

  const handleChangeLimit = (e) => {
    setLimit(e.target.value)
    setPage(firstPage)
  }

  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
    setPage(firstPage)
  }

  const handleChangeSort = (e) => {
    setSort(e.target.value)
    setPage(firstPage)
  }

  const handlerAddContact = () =>
    dispatch(contactAction.setDisplayPopup('flex'))

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
                <option value={totalContacts}>all</option>
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
                <option value="">created</option>
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

      {contacts.length > 1 &&
        contacts.map((contact) => (
          <Contact contact={contact} key={contact._id} />
        ))}

      <ul className={s.pagination}>
        <li>
          <button
            type="button"
            className={s.pagination__button}
            onClick={() => setPage(firstPage)}
          >
            first
          </button>
        </li>
        <li>
          <button
            type="button"
            className={s.pagination__button}
            onClick={() => setPage(prevPage)}
          >
            prev
          </button>
        </li>
        <li>
          <button
            type="button"
            className={s.pagination__button}
            onClick={() => setPage(nextPage)}
          >
            next
          </button>
        </li>
        <li>
          <button
            type="button"
            className={s.pagination__button}
            onClick={() => setPage(lastPage)}
          >
            last
          </button>
        </li>
      </ul>

      <div className={s.pageIndex}>
        page {page} of {lastPage}
      </div>

      <Popup />
    </div>
  )
}

export default ContactsList
