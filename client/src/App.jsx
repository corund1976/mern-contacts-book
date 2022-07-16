import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import authSelectors from './redux/auth/authSelectors'
import loaderSelectors from './redux/loader/loaderSelectors'
import { refresh } from './redux/auth/authOperations'

import LoaderSpinner from './components/loaderSpinner'
import Container from './components/container'
import Navbar from './components/navbar'
import Login from './components/login'
import Signup from './components/signup'
import Profile from './components/profile'
import ContactsList from './components/contactsList'

import './app.module.css'

function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(loaderSelectors.getIsLoading)
  const isAuth = useSelector(authSelectors.getIsAuth)
  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    if (token) dispatch(refresh())
    // eslint-disable-next-line
  }, [dispatch])

  if (isLoading) {
    return <LoaderSpinner />
  }

  return (
    <div>
      <Navbar />
      <Container>
        {!isAuth ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/" element={<ContactsList />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </Container>
    </div>
  )
}

export default App
// To keep the history clean, you should set replace prop. This will avoid extra redirects after the user click back.
