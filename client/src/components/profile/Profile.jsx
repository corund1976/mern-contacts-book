import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import userSelectors from '../../redux/user/userSelectors'
import { fetchCurrentUser } from '../../redux/user/authOperations'
import {
  uploadAvatar,
  deleteAvatar,
  updateSubscription,
  deleteUser,
} from '../../redux/user/userOperations'

import s from './profile.module.css'
import AvatarDefault from '../../assets/img/user.svg'
import AvatarDelete from '../../assets/img/trash-2.svg'
import UserDelete from '../../assets/img/user-x.svg'

function Profile() {
  const dispatch = useDispatch()

  const email = useSelector(userSelectors.getEmail)
  const subscription = useSelector(userSelectors.getSubscription)
  const avatarUrl = useSelector(userSelectors.getAvatarUrl)

  const avatar = avatarUrl ? `${avatarUrl}` : AvatarDefault

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch, avatar])

  const handlerUploadAvatar = (e) => dispatch(uploadAvatar(e.target.files[0]))
  const handlerDeleteAvatar = () => dispatch(deleteAvatar())
  const handlerChangeSubscription = (e) =>
    dispatch(updateSubscription(e.target.value))
  const handlerRemoveProfile = () => dispatch(deleteUser())

  return (
    <div className={s.profile}>
      <h2>User profile</h2>

      <label htmlFor="uploadAvatar" className={s.profile__avatar}>
        <input
          type="file"
          id="uploadAvatar"
          accept="image/*"
          name="file"
          onChange={(e) => handlerUploadAvatar(e)}
          className={s.avatar__input}
        />
        <img src={avatar} alt="avatar" className={s.avatar__img} />
      </label>

      <div className={s.avatar__remove}>
        delete avatar:
        <button
          type="button"
          className={s.avatar__removeBtn}
          onClick={handlerDeleteAvatar}
        >
          <img
            src={AvatarDelete}
            alt="avatar delete"
            className={s.profile__removeImg}
          />
        </button>
      </div>

      <div className={s.profile__email}>email: {email}</div>

      <div className={s.profile__subscription}>
        subscription:
        <label htmlFor="selectSubscription">
          <select
            name="subscription"
            id="selectSubscription"
            value={subscription}
            onChange={(e) => handlerChangeSubscription(e)}
          >
            <option value="starter">starter</option>
            <option value="business">business</option>
            <option value="pro">pro</option>
          </select>
        </label>
      </div>

      <div className={s.profile__remove}>
        remove account:
        <button
          type="button"
          className={s.profile__removeBtn}
          onClick={handlerRemoveProfile}
        >
          <img
            src={UserDelete}
            alt="profile delete"
            className={s.profile__removeImg}
          />
        </button>
      </div>
    </div>
  )
}

export default Profile
