import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser } from '../redux/user/authOperations'

import Container from './container'
import Navbar from './navbar/Navbar'
import Login from './login'
import Signup from './signup/Signup'
import ContactsList from './contactsList/ContactsList'

import s from './app.module.css'

function App() {
  const isAuth = useSelector((state) => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  return (
    <div className={s.app}>
      <Navbar />
      <Container>
        {!isAuth ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Login />} />
          </Routes>
        ) : (
          <Routes>
            <Route exac path="/" element={<ContactsList />} />
            <Route
              path="*"
              element={<Navigate to="/" replace />}
              // To keep the history clean, you should set replace prop. This will avoid extra redirects after the user click back.
            />
          </Routes>
        )}
      </Container>
    </div>
  )
}

export default App
