import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import contactSelector from 'redux/contact/contactSelectors'
import contactAction from 'redux/contact/contactReducer'
import contactOperation from 'redux/contact/contactOperations'
import Input from 'components/subcomponents/input'

import s from './popup.module.css'

function Popup() {
  const dispatch = useDispatch()
  const displayPopup = useSelector(contactSelector.getDisplayPopup)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const resetState = () => {
    setName('')
    setEmail('')
    setPhone('')
  }

  const closePopup = () => {
    dispatch(contactAction.setDisplayPopup('none'))
    resetState()
  }

  const addContact = (e) => {
    e.preventDefault() // чтобы не перезагружать страницу при отправке формы
    dispatch(contactOperation.add({ name, email, phone }))
    closePopup()
  }

  const stopPropagation = (e) => e.stopPropagation()

  return (
    <div
      className={s.popup}
      style={{ display: displayPopup }}
      onClick={closePopup}
      onKeyPress={closePopup}
      role="button"
      tabIndex="0"
    >
      <div
        className={s.popup__content}
        onClick={stopPropagation}
        onKeyPress={stopPropagation}
        role="button"
        tabIndex="0"
      >
        <div className={s.popup__header}>
          <h2>Create new contact</h2>
          <button type="button" className={s.popup__close} onClick={closePopup}>
            X
          </button>
        </div>
        <form className={s.popup__form} onSubmit={(e) => addContact(e)}>
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
