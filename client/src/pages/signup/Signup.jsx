import authOperation from 'redux/auth/authOperations'

import AuthForm from 'components/authForm'

import s from './signup.module.css'

function Signup() {
  let email = ''

  const signup = (credentials) => {
    authOperation.signup(credentials)
    email = credentials.email
  }

  const resendVerify = () => {
    authOperation.resendVerify(email)
    email = ''
  }

  return (
    <div className={s.auth}>
      <AuthForm header="Signup" handlerSubmit={signup} />
      <button className={s.btn__resend} type="button" onClick={resendVerify}>
        resend verify email
      </button>
    </div>
  )
}

export default Signup
