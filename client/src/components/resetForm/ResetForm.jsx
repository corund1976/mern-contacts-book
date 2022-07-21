import { useState } from 'react'
import PropTypes from 'prop-types'

import Input from 'components/subcomponents/input'

import s from './resetForm.module.css'

function ResetForm({ handlerSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayPassword, setDisplayPassword] = useState('password')

  const handleChangeChk = () => {
    if (displayPassword === 'password') {
      setDisplayPassword('text')
    } else {
      setDisplayPassword('password')
    }
  }

  // const formReset = () => {
  //   setEmail('')
  //   setPassword('')
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    const credentials = { email, password }
    handlerSubmit(credentials)
    // formReset()
  }

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <h2 className={s.header}>Reset password</h2>

      <Input
        value={email}
        setValue={setEmail}
        type="email"
        placeholder="email..."
      />

      <Input
        value={password}
        setValue={setPassword}
        type={displayPassword}
        placeholder="new password..."
        autoComplete="off"
      />

      <div className={s.checkbox__wrapper}>
        <input
          className={s.checkbox__input}
          type="checkbox"
          onChange={handleChangeChk}
        />
        <p className={s.checkbox__placeholder}>show/hide password</p>
      </div>

      <button type="submit" className={s.enter__btn}>
        Enter
      </button>
    </form>
  )
}

export default ResetForm

ResetForm.propTypes = {
  handlerSubmit: PropTypes.func.isRequired,
}
