/**
 * AI Assistance Disclosure
 * Tool: Cursor (GPT-5.6 Sol Medium)
 * Scope: Assisted with frontend implementation, debugging and UI refinement.
 * Author review: The generated code was reviewed, tested, and iteratively refined by the author through follow-up instructions.
 */

import { useState, type FormEvent } from 'react'
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { CampusScene } from '../components/CampusArt'

const allowedEmailDomains = [
  '@u.nus.edu',
  '@u.duke.nus.edu',
  '@u.yale-nus.edu.sg',
]

const emptyErrors = {
  username: '',
  email: '',
  password: '',
  firstName: '',
  lastName: '',
}

function RegisterPage() {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  })
  const [errors, setErrors] = useState(emptyErrors)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedEmail = formValues.email.trim().toLowerCase()
    const emailParts = normalizedEmail.split('@')
    const hasAllowedEmailDomain =
      emailParts.length === 2 &&
      emailParts[0].length > 0 &&
      allowedEmailDomains.includes(`@${emailParts[1]}`)

    const newErrors = {
      username: formValues.username.trim() ? '' : 'Username is required.',
      email: !normalizedEmail
        ? 'NUSNET email address is required.'
        : hasAllowedEmailDomain
          ? ''
          : 'Use an approved NUSNET email domain.',
      password: !formValues.password
        ? 'Password is required.'
        : formValues.password.length >= 15
          ? ''
          : 'Password must be at least 15 characters.',
      firstName: formValues.firstName.trim() ? '' : 'First name is required.',
      lastName: formValues.lastName.trim() ? '' : 'Last name is required.',
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some((message) => message)) {
      return
    }

    // TODO: Replace this frontend-only validation with registration through
    // the team's existing User Service.
  }

  return (
    <Container component="main" maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        sx={{ alignItems: 'flex-start' }}
      >
        <Box sx={{ flex: { md: '0 0 280px' }, width: '100%' }}>
          <CampusScene tone="teal" />
          <Typography
            color="secondary.main"
            variant="overline"
            sx={{
              mt: 1.5,
              display: 'block',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Friend of Campus
          </Typography>
          <Typography component="h1" variant="h4">
            Register
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.75 }}>
            Create your campus errands profile.
          </Typography>
        </Box>

        <Paper
          variant="outlined"
          sx={{
            flex: 1,
            width: '100%',
            minWidth: 0,
            p: { xs: 2.5, md: 3.5 },
            borderColor: 'divider',
            bgcolor: 'background.paper',
            boxShadow: '0 12px 34px rgba(23, 35, 45, 0.07)',
          }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <Stack spacing={3}>
              <TextField
                required
                label="Username"
                value={formValues.username}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    username: event.target.value,
                  })
                }
                error={Boolean(errors.username)}
                helperText={errors.username}
              />

              <TextField
                required
                type="email"
                label="NUSNET Email Address"
                value={formValues.email}
                onChange={(event) =>
                  setFormValues({ ...formValues, email: event.target.value })
                }
                error={Boolean(errors.email)}
                helperText={
                  errors.email ||
                  'Allowed: @u.nus.edu, @u.duke.nus.edu, @u.yale-nus.edu.sg'
                }
              />

              <TextField
                required
                type="password"
                label="Password"
                value={formValues.password}
                onChange={(event) =>
                  setFormValues({ ...formValues, password: event.target.value })
                }
                error={Boolean(errors.password)}
                helperText={
                  errors.password || 'Use at least 15 characters.'
                }
              />

              <TextField
                required
                label="First Name"
                value={formValues.firstName}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    firstName: event.target.value,
                  })
                }
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
              />

              <TextField
                required
                label="Last Name"
                value={formValues.lastName}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    lastName: event.target.value,
                  })
                }
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
              />

              <Button type="submit" variant="contained" size="large">
                Register
              </Button>

              <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
                Already have an account?{' '}
                <Link component={RouterLink} to="/login">
                  Log in
                </Link>
              </Typography>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Container>
  )
}

export default RegisterPage
