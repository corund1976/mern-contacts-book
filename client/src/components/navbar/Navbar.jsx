import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import authOperation from 'redux/auth/authOperations'
import authSelector from 'redux/auth/authSelectors'
import userSelector from 'redux/user/userSelectors'
import Container from 'components/container'

import Logo from 'assets/img/book-open.svg'
import Logout from 'assets/img/log-out.svg'
import AvatarDefault from 'assets/img/user.svg'

import s from './navbar.module.css'

function Navbar() {
  const dispatch = useDispatch()
  const isAuth = useSelector(authSelector.getIsAuth)
  const avatarUrl = useSelector(userSelector.getAvatarUrl)

  const avatar = avatarUrl ? `${avatarUrl}` : AvatarDefault

  const handlerLogout = () => dispatch(authOperation.logout())

  return (
    <div className={s.navbar__section}>
      <Container>
        <nav className={s.navbar}>
          <Link to="/" className={s.navbar__home}>
            <img src={Logo} alt="logo" className={s.navbar__logo} />
            <div className={s.navbar__header}>Contacts</div>
          </Link>
          {!isAuth && (
            <Link to="/login" className={s.navbar__login}>
              Login
            </Link>
          )}
          {!isAuth && (
            <Link to="/signup" className={s.navbar__signup}>
              Signup
            </Link>
          )}
          {isAuth && (
            <Link to="/profile" className={s.navbar__profile}>
              <img src={avatar} alt="avatar" className={s.navbar__avatar} />
            </Link>
          )}
          {isAuth && (
            <button
              type="button"
              className={s.navbar__logout}
              onClick={handlerLogout}
            >
              <img src={Logout} alt="logout" />
            </button>
          )}
        </nav>
      </Container>
    </div>
  )
}

export default Navbar
