import { useEffect, Suspense } from 'react'
import { useDispatch } from 'react-redux'

import authOperation from 'redux/auth/authOperations'

import LoaderSpinner from 'components/loaderSpinner'
import Navbar from 'components/navbar'
import Container from 'components/subcomponents/container'
import Router from 'components/router'

import 'app.module.css'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authOperation.refresh())
  }, [dispatch])

  return (
    <Suspense fallback={<LoaderSpinner />}>
      <Navbar />
      <Container>
        <Router />
      </Container>
    </Suspense>
  )
}

export default App
