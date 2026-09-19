import { useState, type FormEvent } from 'react'
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

const temporaryProfile = {
  username: 'sample.user',
  email: 'sample.user@example.com',
  firstName: 'Sample',
  lastName: 'User',
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <Stack spacing={0.25}>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography
        variant="body1"
        color="text.primary"
        sx={{ fontSize: '1.05rem', fontWeight: 500 }}
      >
        {value}
      </Typography>
    </Stack>
  )
}

function AccountPage() {
  const [profile, setProfile] = useState(temporaryProfile)
  const [formValues, setFormValues] = useState(temporaryProfile)
  const [isEditing, setIsEditing] = useState(false)

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // TODO: Load and update profile data through the team's existing User Service.
    setProfile(formValues)
    setIsEditing(false)
  }

  function handleCancel() {
    setFormValues(profile)
    setIsEditing(false)
  }

  return (
    <Container component="main" maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            alignItems: { sm: 'center' },
            justifyContent: 'space-between',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
            Account
          </Typography>

          {!isEditing && (
            <Button
              variant="contained"
              onClick={() => {
                setFormValues(profile)
                setIsEditing(true)
              }}
              sx={{ alignSelf: { xs: 'flex-start', sm: 'auto' } }}
            >
              Edit Profile
            </Button>
          )}
        </Stack>

        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
          {isEditing ? (
            <form onSubmit={handleSave}>
              <Stack spacing={2}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 2,
                  }}
                >
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
                  />
                  <TextField
                    required
                    type="email"
                    label="Email"
                    value={formValues.email}
                    onChange={(event) =>
                      setFormValues({
                        ...formValues,
                        email: event.target.value,
                      })
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
                  />
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                  <Button variant="outlined" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </form>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: { xs: 1.5, sm: 2 },
              }}
            >
              <ProfileField label="Username" value={profile.username} />
              <ProfileField label="Email" value={profile.email} />
              <ProfileField label="First Name" value={profile.firstName} />
              <ProfileField label="Last Name" value={profile.lastName} />
            </Box>
          )}

          <Divider sx={{ my: 2.5 }} />

          <Stack component="section" spacing={1.25}>
            <Typography component="h2" variant="h6" sx={{ fontWeight: 600 }}>
              Available Roles
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip label="Requester" color="primary" variant="outlined" />
              <Chip label="Courier" color="primary" variant="outlined" />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Roles are managed by the system and cannot be edited here.
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}

export default AccountPage
