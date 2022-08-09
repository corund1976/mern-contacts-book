import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import contactOperation from 'redux/contact/contactOperations'
import contactSelector from 'redux/contact/contactSelectors'
import popupAction from 'redux/popup/popupReducer'

import Container from 'components/subcomponents/container'
import ContactsList from 'components/contactsList'
import Popup from 'components/popup'

import s from './contacts.module.css'

const LIMIT = process.env.REACT_APP_PAGINATION_PER_PAGE

function Contacts() {
  const dispatch = useDispatch()

  const contacts = useSelector(contactSelector.getContacts)
  const totalContacts = useSelector(contactSelector.getTotalContacts)
  const firstPage = useSelector(contactSelector.getFirstPage)
  const prevPage = useSelector(contactSelector.getPrevPage)
  const nextPage = useSelector(contactSelector.getNextPage)
  const lastPage = useSelector(contactSelector.getLastPage)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(LIMIT)
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('-updatedAt')

  useEffect(() => {
    dispatch(contactOperation.getList({ page, limit, filter, sort }))
  }, [dispatch, page, limit, filter, sort, contacts.length])

  useEffect(() => {
    if (page > lastPage) setPage(lastPage)
    // eslint-disable-next-line
  }, [lastPage])

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

  const addContact = (contact) => dispatch(contactOperation.add(contact))

  const handleAddContact = () => {
    dispatch(popupAction.setDisplayPopup('flex'))
    dispatch(popupAction.setFormTitle('Create new contact'))
    dispatch(popupAction.setButtonTitle('Add contact'))
    dispatch(popupAction.setSubmitHandler(addContact))
  }

  return (
    <div className={s.section}>
      <Container>
        <h2 className={s.header}>{totalContacts} Contacts</h2>
        <div className={s.controls}>
          <button
            type="button"
            className={s.btn_newContact}
            onClick={handleAddContact}
          >
            + new contact
          </button>

          <ul className={s.selectors}>
            <li className={s.selectors_item}>
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
            <li className={s.selectors_item}>
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
            <li className={s.selectors_item}>
              sort by:
              <label htmlFor="selectSort">
                <select
                  id="selectSort"
                  value={sort}
                  onChange={(e) => handleChangeSort(e)}
                >
                  <option value="-updatedAt">updated</option>
                  <option value="email">email</option>
                  <option value="name">name A-Z</option>
                  <option value="-name">name Z-A</option>
                  <option value="phone">phone</option>
                  <option value="-createdAt">created</option>
                </select>
              </label>
            </li>
          </ul>
        </div>

        <ContactsList />

        <ul className={s.pagination}>
          <li className={s.pagination__item}>
            <button
              type="button"
              className={s.pagination__btn}
              onClick={() => setPage(firstPage)}
            >
              first
            </button>
          </li>
          <li className={s.pagination__item}>
            <button
              type="button"
              className={s.pagination__btn}
              onClick={() => setPage(prevPage)}
            >
              prev
            </button>
          </li>
          <li className={s.pagination__item}>
            <button
              type="button"
              className={s.pagination__btn}
              onClick={() => setPage(nextPage)}
            >
              next
            </button>
          </li>
          <li className={s.pagination__item}>
            <button
              type="button"
              className={s.pagination__btn}
              onClick={() => setPage(lastPage)}
            >
              last
            </button>
          </li>
        </ul>
        <p className={s.page}>
          page {page} of {lastPage}
        </p>

        <Popup />
      </Container>
    </div>
  )
}

export default Contacts
