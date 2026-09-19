import { useState, type FormEvent } from 'react'
import {
  Alert,
  Button,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!usernameOrEmail.trim() || !password.trim()) {
      setErrorMessage('Please enter your username/email and password.')
      return
    }

    // TODO: Replace this temporary frontend-only navigation with authentication
    // through the team's existing User Service.
    navigate('/home')
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
      <Stack spacing={3}>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
          Log In
        </Typography>

        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
          <form onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>
              {errorMessage && (
                <Alert severity="error">{errorMessage}</Alert>
              )}

              <TextField
                required
                fullWidth
                label="Username or Email"
                value={usernameOrEmail}
                onChange={(event) => {
                  setUsernameOrEmail(event.target.value)
                  setErrorMessage('')
                }}
              />

              <TextField
                required
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setErrorMessage('')
                }}
              />

              <Button type="submit" variant="contained" size="large">
                Log In
              </Button>

              <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <Link component={RouterLink} to="/register">
                  Register
                </Link>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  )
}

export default LoginPage
