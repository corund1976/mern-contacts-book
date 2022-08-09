import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import popupSelector from 'redux/popup/popupSelectors'
import popupAction from 'redux/popup/popupReducer'

import Input from 'components/subcomponents/input'

import s from './popup.module.css'

function Popup() {
  const dispatch = useDispatch()
  const displayPopup = useSelector(popupSelector.getDisplayPopup)
  const formTitle = useSelector(popupSelector.getFormTitle)
  const buttonTitle = useSelector(popupSelector.getButtonTitle)
  const contactId = useSelector(popupSelector.getContactId)

  const submitHandler = useSelector(popupSelector.getSubmitHandler)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const resetState = () => {
    setName('')
    setEmail('')
    setPhone('')
  }

  const closePopup = () => {
    dispatch(popupAction.resetStatePopup())
    resetState()
  }

  const handleSubmit = (e) => {
    e.preventDefault() // чтобы не перезагружать страницу при отправке формы
    submitHandler({ name, email, phone }, contactId) // contactId вторым, т.к. при addContact он не используется
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
          <h2>{formTitle}</h2>
          <button type="button" className={s.popup__close} onClick={closePopup}>
            X
          </button>
        </div>
        <form className={s.popup__form} onSubmit={(e) => handleSubmit(e)}>
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
            {buttonTitle}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Popup
