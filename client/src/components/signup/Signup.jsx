import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { signup } from '../../redux/user/authOperations'

import Input from '../input/Input'
import s from './signup.module.css'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signup({ email, password }))
    setEmail('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit} className={s.signup}>
      <h2 className={s.signup__header}>Signup</h2>
      <Input
        value={email}
        setValue={setEmail}
        type="email"
        placeholder="email..."
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="password..."
        autoComplete="current-password"
      />
      <button type="submit" className={s.signup__btn}>
        Enter
      </button>
    </form>
  )
}

export default Signup
