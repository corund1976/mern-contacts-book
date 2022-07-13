import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { login } from '../../redux/user/authOperations'

import Input from '../input'

import s from './login.module.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
    setEmail('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit} className={s.login}>
      <h2 className={s.login__header}>Login</h2>
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
      <button type="submit" className={s.login__btn}>
        Enter
      </button>
    </form>
  )
}

export default Login
