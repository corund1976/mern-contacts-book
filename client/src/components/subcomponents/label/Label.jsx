import PropTypes from 'prop-types'

import styles from './label.module.css'

const Label = ({ htmlFor, children }) => {
  const labelClasses = [styles.label]

  return (
    <label className={labelClasses.join(' ')} htmlFor={htmlFor}>
      {children}
    </label>
  )
}

export default Label

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
