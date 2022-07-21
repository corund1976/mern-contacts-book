import { useDispatch } from 'react-redux'

import authOperation from 'redux/auth/authOperations'

import AuthForm from 'components/authForm'

import s from './login.module.css'

function Login() {
  const dispatch = useDispatch()

  const login = (credentials) => {
    dispatch(authOperation.login(credentials))
  }

  const forgotPassword = () => {
    // eslint-disable-next-line
    console.log('forgot password')
  }

  return (
    <div className={s.auth}>
      <AuthForm header="Login" handlerSubmit={login} />
      <button className={s.btn__forgot} type="button" onClick={forgotPassword}>
        forgot password ?
      </button>
    </div>
  )
}

export default Login
