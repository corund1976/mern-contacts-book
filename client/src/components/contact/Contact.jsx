import PropTypes from 'prop-types'

import s from './contact.module.css'

function Contact({ contact }) {
  const { name, email, phone, favorite } = contact
  return (
    <div className={s.contact}>
      <div>{name}</div>
      <div>{phone}</div>
      <div>{email}</div>
      <div>{favorite ? '+' : '-'}</div>
    </div>
  )
}

export default Contact

Contact.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
  }).isRequired,
}
