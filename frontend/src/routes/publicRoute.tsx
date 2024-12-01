import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useSelector((state: { login: LoginInitialState }) => state.login.user)

  if (token) {
    return <Navigate to='/monthly-sales' />
  }

  return children
}

export default PublicRoute
