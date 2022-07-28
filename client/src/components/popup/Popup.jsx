import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import contactSelectors from 'redux/contact/contactSelectors'
import contactAction from 'redux/contact/contactReducer'
import contactOperation from 'redux/contact/contactOperations'
import Input from 'components/subcomponents/input'

import s from './popup.module.css'

function Popup() {
  const dispatch = useDispatch()
  const displayPopup = useSelector(contactSelectors.getDisplayPopup)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleClosePopup = (e) => {
    e.preventDefault()

    dispatch(contactAction.setDisplayPopup('none'))

    setName('')
    setEmail('')
    setPhone('')
  }
  const handleStopPropagation = (e) => e.stopPropagation()

  const handleAddContact = () =>
    dispatch(contactOperation.add({ name, email, phone }))

  return (
    <div
      className={s.popup}
      style={{ display: displayPopup }}
      onClick={handleClosePopup}
      onKeyPress={handleClosePopup}
      role="button"
      tabIndex="0"
    >
      <div
        className={s.popup__content}
        onClick={handleStopPropagation}
        onKeyPress={handleStopPropagation}
        role="button"
        tabIndex="0"
      >
        <div className={s.popup__header}>
          <h2>Create new contact</h2>
          <button
            type="button"
            className={s.popup__close}
            onClick={handleClosePopup}
          >
            X
          </button>
        </div>
        <form className={s.popup__form} onSubmit={handleAddContact}>
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
