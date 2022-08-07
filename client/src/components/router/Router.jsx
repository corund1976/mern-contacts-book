import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import authSelector from 'redux/auth/authSelectors'

import routes from 'routes'

function Router() {
  const isAuth = useSelector(authSelector.getIsAuth)

  return isAuth ? (
    <Routes>
      {routes.privateRoutes.map((route) => (
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
      {routes.publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          element={route.element}
        />
      ))}
    </Routes>
  )
}

export default Router
