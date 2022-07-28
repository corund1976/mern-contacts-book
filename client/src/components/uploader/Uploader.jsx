import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import uploaderAction from 'redux/uploader/uploaderReducer'

import s from './uploader.module.css'

function Uploader({ file }) {
  const dispatch = useDispatch()

  const handleCloseUploader = () =>
    dispatch(uploaderAction.resetStateUploader())

  return (
    <div className={s.section}>
      <p className={s.header}>Uploading progress</p>

      <p className={s.title}>{file.name}</p>

      <div className={s.progress_bar}>
        <div className={s.upload_bar} style={{ width: `${file.progress}%` }}>
          .
        </div>
        <div className={s.percent}>{file.progress}%</div>
      </div>

      <button
        type="button"
        className={s.close__btn}
        onClick={handleCloseUploader}
      >
        Ok
      </button>
    </div>
  )
}

export default Uploader

Uploader.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
  }).isRequired,
}
// const file = {name: 'Фото Резюме 1_1.jpg', progress: 10}
