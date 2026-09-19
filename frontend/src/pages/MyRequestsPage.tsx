import { Container, Paper, Stack, Typography } from '@mui/material'

function MyRequestsPage() {
  return (
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography component="h1" variant="h4">
            My Requests
          </Typography>
          <Typography color="text.secondary">
            Track your campus errand requests in one place.
          </Typography>
        </Stack>
        <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 } }}>
          <Typography variant="h6">Coming soon</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            This feature is under development.
          </Typography>
        </Paper>
      </Stack>
    </Container>
  )
}

export default MyRequestsPage
