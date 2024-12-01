import { TextField, Button, Alert, Typography, Autocomplete } from '@mui/material'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getVendors, setUser } from '../../features/login/index.ts'
import { AppDispatch } from '../../redux/store.tsx'
import AxiosInstance from '../../utils/axiosInstance.ts'
import config from '../../../config.ts'
import Error from '../error/index.tsx'

type StateProps = {
  handleShowLogin: (value: boolean) => void
  vendors: {
    data: Vendor[] | null
    status: string
    error: string | null
  }
}

const Register: React.FC<StateProps> = ({ handleShowLogin, vendors }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [signupError, setSignupError] = useState<string>('')

  useEffect(() => {
    dispatch(getVendors())
  }, [dispatch])

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const validateForm = () => {
    if (!email || !password || !name || !vendor) {
      setError('All fields are required')
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
      const response = await AxiosInstance.put(`${config.serverIp}/auth/signup`, {
        email,
        password,
        name,
        vendor: vendor?._id,
      })
      dispatch(setUser(response.data))
    } catch (error: any) {
      setSignupError(error.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {signupError !== '' && <Error error={signupError ?? 'Unexpected error occurred.'} />}
      <div className='flex justify-center items-center h-screen'>
        <div className='w-full max-w-md p-8 bg-white shadow-md rounded-md'>
          <Typography
            variant='h5'
            component='h2'
            align='center'
            gutterBottom>
            Register
          </Typography>
          <Typography
            variant='h6'
            component='h2'
            align='center'
            color='textSecondary'
            sx={{ fontSize: '0.875rem' }}
            gutterBottom>
            Fill out the form carefully for registration
          </Typography>

          <form onSubmit={handleSubmit}>
            <Autocomplete
              id='vendor'
              options={vendors?.data || []}
              getOptionLabel={option => option.name || ''}
              value={vendor}
              onChange={(_event, newValue) => setVendor(newValue)}
              renderInput={params => (
                <TextField
                  {...params}
                  label='Vendor'
                  fullWidth
                  margin='normal'
                  error={!!error}
                  helperText={error && error.includes('Vendor') ? error : ''}
                />
              )}
              noOptionsText='No vendors available'
            />
            <TextField
              id='name'
              label='Name'
              variant='outlined'
              fullWidth
              margin='normal'
              value={name}
              onChange={handleNameChange}
              error={!!error}
              helperText={error && error.includes('Name') ? error : ''}
            />
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
              {loading && !error && !vendors.error ? 'Registering...' : 'Register'}
            </Button>
            <div className='text-center mt-4'>
              <p className='text-gray-600'>
                Already have an account?{' '}
                <button
                  className='text-blue-500 hover:underline'
                  onClick={() => handleShowLogin(true)}>
                  Sign in
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
