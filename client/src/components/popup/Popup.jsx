import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import contactSelectors from '../../redux/contact/contactSelectors'
import { setDisplayPopup } from '../../redux/contact/contactReducer'
import { addContact } from '../../redux/contact/contactOperations'

import Input from '../input'

import s from './popup.module.css'

function Popup() {
  const dispatch = useDispatch()

  const displayPopup = useSelector(contactSelectors.getDisplayPopup)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handlerClosePopup = (e) => {
    e.preventDefault()
    dispatch(setDisplayPopup('none'))
    setName('')
    setEmail('')
    setPhone('')
  }
  const handlerStopPropagation = (e) => e.stopPropagation()
  const handlerAddContact = () => dispatch(addContact({ name, email, phone }))

  return (
    <div
      className={s.popup}
      style={{ display: displayPopup }}
      onClick={handlerClosePopup}
      onKeyPress={handlerClosePopup}
      role="button"
      tabIndex="0"
    >
      <div
        className={s.popup__content}
        onClick={handlerStopPropagation}
        onKeyPress={handlerStopPropagation}
        role="button"
        tabIndex="0"
      >
        <div className={s.popup__header}>
          <h2>Create new contact</h2>
          <button
            type="button"
            className={s.popup__close}
            onClick={handlerClosePopup}
          >
            X
          </button>
        </div>
        <form className={s.popup__form} onSubmit={handlerAddContact}>
          <Input
            type="text"
            value={name}
            setValue={setName}
            placeholder="name..."
          />
          <Input
            type="text"
            value={email}
            setValue={setEmail}
            placeholder="email..."
          />
          <Input
            type="text"
            value={phone}
            setValue={setPhone}
            placeholder="phone..."
          />
          <button type="submit" className={s.popup__create}>
            Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default Popup
