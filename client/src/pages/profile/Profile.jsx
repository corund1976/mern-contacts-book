import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import userSelector from 'redux/user/userSelectors'
import uploaderSelector from 'redux/uploader/uploaderSelectors'
import userOperation from 'redux/user/userOperations'

import Container from 'components/subcomponents/container'
import Uploader from 'components/uploader'
import Input from 'components/subcomponents/input'

import AvatarDefault from 'assets/img/user.svg'
import AvatarDelete from 'assets/img/trash-2.svg'
import UserDelete from 'assets/img/user-x.svg'

import s from './profile.module.css'

function Profile() {
  const dispatch = useDispatch()

  const email = useSelector(userSelector.getEmail)
  const subscription = useSelector(userSelector.getSubscription)
  const avatarUrl = useSelector(userSelector.getAvatarUrl)
  const showUploader = useSelector(uploaderSelector.getShowUploader)
  const file = useSelector(uploaderSelector.getFile)

  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const avatar = avatarUrl ? `${avatarUrl}` : AvatarDefault

  const handleUploadAvatar = (e) =>
    dispatch(userOperation.updateAvatar(e.target.files[0]))

  const handleDeleteAvatar = () =>
    dispatch(userOperation.deleteAvatar(AvatarDefault))

  const handleChangePassword = (e) => {
    e.preventDefault()
    const credentials = { password, newPassword }
    userOperation.updatePassword(credentials)
  }

  const handleChangeSubscription = (e) =>
    dispatch(userOperation.updateSubscription(e.target.value))

  const handleRemoveProfile = () => dispatch(userOperation.deleteUser())

  return (
    <Container>
      <div className={s.profile}>
        <h2>User profile</h2>

        <label htmlFor="uploadAvatar" className={s.profile__avatar}>
          <input
            type="file"
            id="uploadAvatar"
            accept="image/*"
            name="file"
            onChange={(e) => handleUploadAvatar(e)}
            className={s.avatar__input}
          />
          <img src={avatar} alt="avatar" className={s.avatar__img} />
        </label>

        <div className={s.avatar__remove}>
          delete avatar:
          <button
            type="button"
            className={s.avatar__removeBtn}
            onClick={handleDeleteAvatar}
          >
            <img
              src={AvatarDelete}
              alt="avatar delete"
              className={s.profile__removeImg}
            />
          </button>
        </div>

        <div className={s.email}>email: {email}</div>

        <div className={s.password}>
          password:
          <form
            onSubmit={handleChangePassword}
            className={s.changePassword__form}
          >
            <Input
              value={password}
              setValue={setPassword}
              type="password"
              placeholder="current password..."
            />
            <Input
              value={newPassword}
              setValue={setNewPassword}
              type="password"
              placeholder="new password..."
            />
            <button type="submit" className={s.changePassword__btn}>
              change
            </button>
          </form>
        </div>

        <div className={s.subscription}>
          subscription:
          <label htmlFor="selectSubscription">
            <select
              name="subscription"
              id="selectSubscription"
              value={subscription}
              onChange={(e) => handleChangeSubscription(e)}
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
            onClick={handleRemoveProfile}
          >
            <img
              src={UserDelete}
              alt="profile delete"
              className={s.profile__removeImg}
            />
          </button>
        </div>

        {showUploader && <Uploader file={file} />}
      </div>
    </Container>
  )
}

export default Profile
