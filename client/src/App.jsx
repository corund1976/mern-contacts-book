import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser } from './redux/user/authOperations'

import Container from './components/container'
import Navbar from './components/navbar/Navbar'
import Login from './components/login'
import Signup from './components/signup'
import ContactsList from './components/contactsList'

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
            <Route exact path="/" element={<ContactsList />} />
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
