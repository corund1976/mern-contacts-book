import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../../actions/user'
import Container from '../container/Container'
import s from './navbar.module.css'
import Logo from '../../assets/img/book-open.svg'

function Navbar() {
  const isAuth = useSelector((state) => state.user.isAuth)
  const dispatch = useDispatch()

  return (
    <div className={s.navbar__section}>
      <Container>
        <nav className={s.navbar}>
          <Link to="/" className={s.navbar__home}>
            <img src={Logo} alt="logo" className={s.navbar__logo} />
            <div className={s.navbar__header}>Contacts Book</div>
          </Link>
          {!isAuth && (
            <Link to="/login" className={s.navbar__login}>
              Войти
            </Link>
          )}
          {!isAuth && (
            <Link to="/signup" className={s.navbar__signup}>
              Регистрация
            </Link>
          )}
          {isAuth && (
            <button
              type="button"
              className={s.navbar__logout}
              onClick={() => dispatch(logout())}
            >
              Выход
            </button>
          )}
        </nav>
      </Container>
    </div>
  )
}

export default Navbar
