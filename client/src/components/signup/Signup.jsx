import { useState } from 'react'

import { signup } from '../../actions/user'
import Input from '../input/Input'
import s from './signup.module.css'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className={s.signup}>
      <div className={s.signup__header}>Signup</div>
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
        className={s.signup__btn}
        onClick={() => signup(email, password)}
      >
        Enter
      </button>
    </div>
  )
}

export default Signup
