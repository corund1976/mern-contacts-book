import { useEffect, Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import authSelectors from 'redux/auth/authSelectors'
import { refresh } from 'redux/auth/authOperations'

import LoaderSpinner from 'components/loaderSpinner'
import Container from 'components/container'
import Navbar from 'components/navbar'

import 'app.module.css'

const Login = lazy(() => import('pages/login'))
const Signup = lazy(() => import('pages/signup'))
const Profile = lazy(() => import('pages/profile'))
const ContactsList = lazy(() => import('pages/contactsList'))

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(authSelectors.getIsAuth)

  useEffect(() => {
    dispatch(refresh())
  }, [dispatch])

  return (
    <Suspense fallback={<LoaderSpinner />}>
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
    </Suspense>
  )
}

export default App
// To keep the history clean, you should set replace prop. This will avoid extra redirects after the user click back.
