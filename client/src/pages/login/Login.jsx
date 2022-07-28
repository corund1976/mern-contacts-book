import { useDispatch } from 'react-redux'

import authOperation from 'operations/authOperations'

import AuthForm from 'components/authForm'

import s from './login.module.css'

function Login() {
  const dispatch = useDispatch()

  const login = (credentials) => {
    dispatch(authOperation.login(credentials))
  }

  const resetPassword = () => {
    window.location = '/resetPassword'
  }

  return (
    <div className={s.auth}>
      <AuthForm header="Login" handlerSubmit={login} />
      <button className={s.btn__forgot} type="button" onClick={resetPassword}>
        reset password
      </button>
    </div>
  )
}

export default Login
