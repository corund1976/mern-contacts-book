import ResetForm from 'components/resetForm'

import authOperations from 'operations/authOperations'

import s from './resetPassword.module.css'

function ResetPassword() {
  const resetPassword = (credentials) => {
    authOperations.resetPassword(credentials)
  }

  return (
    <div className={s.reset}>
      <ResetForm handlerSubmit={resetPassword} />
    </div>
  )
}

export default ResetPassword
