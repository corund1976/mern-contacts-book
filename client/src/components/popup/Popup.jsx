import { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setDisplayPopup } from '../../redux/contact/contactReducer'
import { addContact } from '../../redux/contact/contactOperations'

import Input from '../input'
import s from './popup.module.css'

function Popup() {
  const dispatch = useDispatch()
  const displayPopup = useSelector((state) => state.contact.displayPopup)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const closePopupHandler = () => {
    dispatch(setDisplayPopup('none'))
    setName('')
    setEmail('')
    setPhone('')
  }
  const stopPropagationHandler = (e) => e.stopPropagation()
  const addContactHandler = () => dispatch(addContact({ name, email, phone }))

  return (
    <div
      className={s.popup}
      style={{ display: displayPopup }}
      onClick={closePopupHandler}
      onKeyPress={closePopupHandler}
      role="button"
      tabIndex="0"
    >
      <div
        className={s.popup__content}
        onClick={stopPropagationHandler}
        onKeyPress={stopPropagationHandler}
        role="button"
        tabIndex="0"
      >
        <div className={s.popup__header}>
          <h2>Create new contact</h2>
          <button
            type="button"
            className={s.popup__close}
            onClick={closePopupHandler}
          >
            X
          </button>
        </div>
        <form className={s.popup__form} onSubmit={addContactHandler}>
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
