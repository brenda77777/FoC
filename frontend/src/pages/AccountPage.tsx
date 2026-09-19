import { Container, Stack, Typography } from '@mui/material'

function AccountPage() {
  return (
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      <Stack spacing={2}>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
          Account
        </Typography>
        <Typography color="text.secondary">
          This feature is under development.
        </Typography>
      </Stack>
    </Container>
  )
}

export default AccountPage
