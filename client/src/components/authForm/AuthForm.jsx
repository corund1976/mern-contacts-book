import { useState } from 'react'
import Input from 'components/subcomponents/input'

import s from './authForm.module.css'

function AuthForm({ handlerSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayPassword, setDisplayPassword] = useState('password')

  const handleChangeChk = () => {
    displayPassword === 'password'
      ? setDisplayPassword('text')
      : setDisplayPassword('password')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(authOperation.login({ email, password }))
    setEmail('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <h2 className={s.header}>{authMode === 'login' ? 'Login' : 'Signup'}</h2>
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
        placeholder="password..."
        autoComplete="current-password"
      />
      <p>show/hide password</p>
      <input type="checkbox" onChange={handleChangeChk} />

      <button type="submit" className={s.enter__btn}>
        Enter
      </button>

      <div className={s.bottom__buttons}>
        {authMode === 'login' && (
          <div className={s.signupForgot__buttons}>
            <button
              type="button"
              className={s.signupLogin__btn}
              onClick={() => setAuthMode('signup')}
            >
              signup
            </button>
            <button
              type="button"
              className={s.forgot__btn}
              onClick={resendHandler}
            >
              resend verification
            </button>
          </div>
        )}
        {authMode === 'signup' && (
          <button
            type="button"
            className={s.signupLogin__btn}
            onClick={() => setAuthMode('login')}
          >
            login
          </button>
        )}
      </div>
    </form>
  )
}

export default AuthForm
