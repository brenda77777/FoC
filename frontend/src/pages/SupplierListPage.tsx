import { useState } from 'react'
import { Box, Container, Stack, TextField, Typography } from '@mui/material'
import SupplierCard from '../components/SupplierCard'

// Temporary frontend-only data used while developing the page.
const sampleSuppliers = [
  {
    id: 1,
    name: 'Cool Spot',
    type: 'Food',
    location: 'COM2',
    operatingHours: 'Daily 7:30am - 7:30pm',
  },
  {
    id: 2,
    name: 'Techno Edge',
    type: 'Food',
    location: 'Engineering',
    operatingHours: 'Daily 8am - 8pm',
  },
  {
    id: 3,
    name: 'PC Commons Printer',
    type: 'Printing',
    location: 'COM1',
  },
]

function SupplierListPage() {
  const [searchText, setSearchText] = useState('')

  const normalizedSearch = searchText.toLowerCase()
  const filteredSuppliers = sampleSuppliers.filter((supplier) => {
    return (
      supplier.name.toLowerCase().includes(normalizedSearch) ||
      supplier.type.toLowerCase().includes(normalizedSearch) ||
      supplier.location.toLowerCase().includes(normalizedSearch)
    )
  })

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
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          slotProps={{ htmlInput: { 'aria-label': 'Search suppliers' } }}
          sx={{ maxWidth: 480 }}
        />

        {/* Reserved space for Filter and Sort controls later. */}
        <Box aria-label="Future filter and sort controls" sx={{ minHeight: 40 }} />

        <Box aria-label="Supplier results" sx={{ minHeight: { xs: 320, md: 480 } }}>
          <Stack spacing={{ xs: 2, md: 3 }}>
            {filteredSuppliers.length > 0 ? (
              filteredSuppliers.map((supplier) => (
                <SupplierCard
                  key={supplier.id}
                  name={supplier.name}
                  type={supplier.type}
                  location={supplier.location}
                  operatingHours={supplier.operatingHours}
                />
              ))
            ) : (
              <Typography color="text.secondary">No suppliers found</Typography>
            )}
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}

export default SupplierListPage
