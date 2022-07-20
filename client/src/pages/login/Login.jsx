import { useState } from 'react'
import { useDispatch } from 'react-redux'

import authOperation from 'redux/auth/authOperations'
import Input from 'components/subcomponents/input'

import s from './login.module.css'

function Login() {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authMode, setAuthMode] = useState('login')

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    dispatch(authOperation.login({ email, password }))
    setEmail('')
    setPassword('')
  }

  const handleSubmitSignup = (e) => {
    e.preventDefault()
    authOperation.signup({ email, password })
    setEmail('')
    setPassword('')
  }

  const resendHandler = () => {
    authOperation.resend(email)
  }

  return (
    <form
      onSubmit={
        authMode === 'login'
          ? (e) => {
              handleSubmitLogin(e)
            }
          : (e) => {
              handleSubmitSignup(e)
            }
      }
      className={s.form}
    >
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
        type="password"
        placeholder="password..."
        autoComplete="current-password"
      />
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

export default Login
