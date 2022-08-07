import { useEffect, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import authSelector from 'redux/auth/authSelectors'
import authOperation from 'redux/auth/authOperations'

import LoaderSpinner from 'components/loaderSpinner'
import Navbar from 'components/navbar'
import Container from 'components/subcomponents/container'

import { publicRoutes, privateRoutes } from './router/routes'

import 'app.module.css'

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(authSelector.getIsAuth)

  useEffect(() => {
    dispatch(authOperation.refresh())
  }, [dispatch])

  return (
    <Suspense fallback={<LoaderSpinner />}>
      <Navbar />
      <Container>
        {!isAuth ? (
          <Routes>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                element={route.element}
              />
            ))}
          </Routes>
        ) : (
          <Routes>
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                element={route.element}
              />
            ))}
          </Routes>
        )}
      </Container>
    </Suspense>
  )
}

export default App
