import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useSelector((state: { login: LoginInitialState }) => state.login.user)

  if (!token) {
    return <Navigate to='/login' />
  }

  return children
}

export default ProtectedRoute
