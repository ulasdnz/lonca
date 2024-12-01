import { useState } from 'react'
import Login from '../components/login'
import Register from '../components/signup'
import { useSelector } from 'react-redux'

const login = () => {
  const [showLogin, setShowLogin] = useState(true)
  const vendors = useSelector((state: { login: LoginInitialState }) => state.login.vendors)

  return (
    <div>
      {showLogin ? (
        <Login handleShowLogin={setShowLogin} />
      ) : (
        <Register
          handleShowLogin={setShowLogin}
          vendors={vendors}
        />
      )}
    </div>
  )
}

export default login
