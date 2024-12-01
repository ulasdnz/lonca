import { TextField, Button, Alert, Typography } from '@mui/material'
import { useState } from 'react'
import AxiosInstance from '../../utils/axiosInstance.ts'
import config from '../../../config.ts'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store.tsx'
import { setUser } from '../../features/login/index.ts'
import Error from '../error'

type StateProps = {
  handleShowLogin: (value: boolean) => void
}

const Login: React.FC<StateProps> = ({ handleShowLogin }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [email, setEmail] = useState('robin@lonca.com')
  const [password, setPassword] = useState('123lonca')
  const [error, setError] = useState<string>('')
  const [loginError, setLoginError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required')
      return false
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (!emailRegex.test(email)) {
      setError('Invalid email format')
      return false
    }

    return true
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setError('')

    try {
      const response = await AxiosInstance.post(`${config.serverIp}/auth/login`, { email, password })
      dispatch(setUser(response.data))
    } catch (error: any) {
      setLoginError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loginError != '' && <Error error={loginError ?? 'Unexpected error occurred.'} />}
      <div className='flex justify-center items-center h-screen'>
        <div className='w-full max-w-md p-8 bg-white shadow-md rounded-md'>
          <Typography
            variant='h5'
            component='h2'
            align='center'
            gutterBottom>
            Login
          </Typography>
          <Typography
            variant='h6'
            component='h2'
            align='center'
            color='textSecondary'
            sx={{ fontSize: '0.875rem' }}
            gutterBottom>
            Welcome, please sign in to continue
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              id='email'
              label='Email'
              variant='outlined'
              fullWidth
              margin='normal'
              value={email}
              onChange={handleEmailChange}
              error={!!error}
              helperText={error && error.includes('Email') ? error : ''}
            />
            <TextField
              id='password'
              label='Password'
              type='password'
              variant='outlined'
              fullWidth
              margin='normal'
              value={password}
              onChange={handlePasswordChange}
              error={!!error}
              helperText={error && error.includes('password') ? error : ''}
            />

            {error && (
              <Alert
                severity='error'
                sx={{ marginTop: '1rem' }}>
                {error}
              </Alert>
            )}

            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              sx={{ marginTop: '1rem' }}
              disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <div className='text-center mt-4'>
              <p className='text-gray-600'>
                Don&apos;t have an account?{' '}
                <button
                  className='text-blue-500 hover:underline'
                  onClick={() => handleShowLogin(false)}>
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
