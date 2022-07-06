import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../../actions/user'
import Input from '../input/Input'
import s from './login.module.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  return (
    <div className={s.login}>
      <div className={s.login__header}>Login</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="email..."
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="password..."
      />
      <button
        type="button"
        className={s.login__btn}
        onClick={() => dispatch(login(email, password))}
      >
        Enter
      </button>
    </div>
  )
}

export default Login
