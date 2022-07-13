import PropTypes from 'prop-types'

import styles from './button.module.css'

const Button = ({ type = 'button', label, disabled }) => {
  const btnClasses = [styles.button]

  if (disabled) {
    btnClasses.push(styles.disabled)
  }

  return (
    <button className={btnClasses.join(' ')} type={type} disabled={disabled}>
      {label}
    </button>
  )
}

export default Button

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.string,
}
