import PropTypes from 'prop-types'

function Label({ htmlFor, children }) {
  return <label htmlFor={htmlFor}>{children}</label>
}

export default Label

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
