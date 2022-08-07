import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import authSelector from 'redux/auth/authSelectors'

import { publicRoutes, privateRoutes } from 'routes'

function Router() {
  const isAuth = useSelector(authSelector.getIsAuth)

  const routes = !isAuth ? publicRoutes : privateRoutes

  return (
    <Routes>
      {routes.map((route) => (
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
