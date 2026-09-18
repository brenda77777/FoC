import { Box, Container, Stack, TextField, Typography } from '@mui/material'
import SupplierCard from '../components/SupplierCard'

// Temporary frontend-only data used while developing the page.
const sampleSupplier = {
  name: 'Cool Spot',
  type: 'Food',
  location: 'COM2',
  operatingHours: 'Daily 7:30am - 7:30pm',
}

function SupplierListPage() {
  return (
    // xs applies on small screens, while md applies on medium screens and larger.
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      <Stack spacing={{ xs: 2, md: 3 }}>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
          Suppliers
        </Typography>

        <TextField
          fullWidth
          placeholder="Search suppliers"
          slotProps={{ htmlInput: { 'aria-label': 'Search suppliers' } }}
          sx={{ maxWidth: 480 }}
        />

        {/* Reserved space for Filter and Sort controls later. */}
        <Box aria-label="Future filter and sort controls" sx={{ minHeight: 40 }} />

        <Box aria-label="Supplier results" sx={{ minHeight: { xs: 320, md: 480 } }}>
          {/* The spread syntax passes each supplier field as a separate prop. */}
          <SupplierCard {...sampleSupplier} />
        </Box>
      </Stack>
    </Container>
  )
}

export default SupplierListPage
