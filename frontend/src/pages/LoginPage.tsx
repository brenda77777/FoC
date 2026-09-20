/**
 * AI Assistance Disclosure
 * Tool: Cursor (GPT-5.6 Sol Medium)
 * Scope: Assisted with frontend implementation, debugging and UI refinement.
 * Author review: The generated code was reviewed, tested, and iteratively refined by the author through follow-up instructions.
 */

import { useState, type FormEvent } from 'react'
import {
  Alert,
  Box,
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
        <Box>
          <Typography
            color="secondary.main"
            sx={{ fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            variant="overline"
          >
            CampusGo
          </Typography>
          <Typography component="h1" variant="h4">
            Log In
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.75 }}>
            Continue to your campus errands workspace.
          </Typography>
        </Box>

        <Paper
          variant="outlined"
          sx={{
            p: { xs: 2.5, md: 3.5 },
            borderColor: 'divider',
            boxShadow: '0 12px 34px rgba(23, 35, 45, 0.07)',
          }}
        >
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
