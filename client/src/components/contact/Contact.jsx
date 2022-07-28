import { FaUserEdit, FaTrashAlt } from 'react-icons/fa'
import PropTypes from 'prop-types'

import s from './contact.module.css'

function Contact({ contact, onEdit, onDelete }) {
  const { name, email, phone, favorite, _id } = contact

  const handleOnEdit = () => onEdit(_id, { favorite: !favorite })

  const handleOnDelete = () => onDelete(_id)

  return (
    <div className={s.contact}>
      <ul className={s.data}>
        <li>{name}</li>
        <li>{phone}</li>
        <li>{email}</li>
        <li>{favorite ? '+' : '-'}</li>
      </ul>

      <ul className={s.btns}>
        <li className={s.btns_item}>
          <button className={s.btn} type="button" onClick={handleOnEdit}>
            <FaUserEdit size="20" />
          </button>
        </li>

        <li className={s.btns_item}>
          <button className={s.btn} type="button" onClick={handleOnDelete}>
            <FaTrashAlt size="20" />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Contact

Contact.propTypes = {
  contact: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    favorite: PropTypes.bool.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}
