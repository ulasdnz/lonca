import { Alert } from '@mui/material'

const Error = ({ error }: { error: string }) => {
  return (
    <Alert
      severity='error'
      sx={{ marginTop: '1rem' }}>
      {error}
    </Alert>
  )
}

export default Error
