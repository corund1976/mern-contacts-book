import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Login = lazy(() => import('pages/login'))
const Signup = lazy(() => import('pages/signup'))
const ResetPassword = lazy(() => import('pages/resetPassword'))
const Profile = lazy(() => import('pages/profile'))
const Contacts = lazy(() => import('pages/contacts'))

const RouteNames = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  RESET: "/resetPassword",
  ANY: "*",
  CONTACTS: "/",
  PROFILE: "/profile",
}

export const publicRoutes = [
  { path: RouteNames.LOGIN, exact: false, element: <Login /> },
  { path: RouteNames.SIGNUP, exact: false, element: <Signup /> },
  { path: RouteNames.RESET, exact: false, element: <ResetPassword /> },
  {
    path: RouteNames.ANY, exact: false, element: < Navigate to="/login" replace />
  }

]

export const privateRoutes = [
  { path: RouteNames.CONTACTS, exact: true, element: <Contacts /> },
  { path: RouteNames.PROFILE, exact: true, element: < Profile /> },
  { path: RouteNames.ANY, exact: false, element: < Navigate to="/" replace /> }

]

// To keep the history clean, you should set replace prop. This will avoid extra redirects after the user click back.