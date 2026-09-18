import { Button, Container, Paper, Stack, Typography } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { sampleSuppliers } from './SupplierListPage'

function SupplierDetailPage() {
  // Route parameters are strings, so convert the ID to a number before comparing it.
  const { supplierId } = useParams()
  const supplier = sampleSuppliers.find(
    (item) => item.id === Number(supplierId),
  )

  if (!supplier) {
    return (
      <Container component="main" maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
        <Stack spacing={2}>
          <Typography component="h1" variant="h4">
            Supplier not found
          </Typography>
          <Button component={Link} to="/suppliers" variant="outlined">
            Back
          </Button>
        </Stack>
      </Container>
    )
  }

  return (
    <Container component="main" maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
      <Stack spacing={3}>
        <Button
          component={Link}
          to="/suppliers"
          variant="outlined"
          sx={{ alignSelf: 'flex-start' }}
        >
          Back
        </Button>

        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
          <Stack spacing={1}>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
              {supplier.name}
            </Typography>
            <Typography>Type: {supplier.type}</Typography>
            <Typography>Location: {supplier.location}</Typography>
            {supplier.operatingHours && (
              <Typography>Hours: {supplier.operatingHours}</Typography>
            )}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}

export default SupplierDetailPage
