import PropTypes from 'prop-types'

import './input.module.css'

function Input({ value, setValue, type, placeholder, autoComplete }) {
  return (
    <input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  )
}

export default Input

Input.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
}

Input.defaultProps = {
  autoComplete: '',
}
