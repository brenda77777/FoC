import { useState, type FormEvent } from 'react'
import {
  Button,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

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
    <Container component="main" maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
      <Stack spacing={3}>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
          Register
        </Typography>

        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
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
