import { useState } from 'react'
import { useDispatch } from 'react-redux'

import authOperation from 'redux/auth/authOperations'
import Input from 'components/input'

import s from './login.module.css'

function Login() {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(authOperation.login({ email, password }))

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
