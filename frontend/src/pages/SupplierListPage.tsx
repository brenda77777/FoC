import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import SupplierCard from '../components/SupplierCard'

// Temporary frontend-only data used while developing the page.
export const sampleSuppliers = [
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

const itemsPerPage = 2

type SupplierListPageProps = {
  isAdmin: boolean
}

function SupplierListPage({ isAdmin }: SupplierListPageProps) {
  const [searchText, setSearchText] = useState('')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedSort, setSelectedSort] = useState('name-asc')
  const [page, setPage] = useState(1)

  const normalizedSearch = searchText.toLowerCase()
  const filteredSuppliers = sampleSuppliers.filter((supplier) => {
    const matchesSearch =
      supplier.name.toLowerCase().includes(normalizedSearch) ||
      supplier.type.toLowerCase().includes(normalizedSearch) ||
      supplier.location.toLowerCase().includes(normalizedSearch)

    const matchesType =
      selectedType === 'All' || supplier.type === selectedType

    return matchesSearch && matchesType
  })

  const sortedSuppliers = [...filteredSuppliers].sort((first, second) => {
    if (selectedSort === 'name-desc') {
      return second.name.localeCompare(first.name)
    }

    return first.name.localeCompare(second.name)
  })

  const pageCount = Math.ceil(sortedSuppliers.length / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedSuppliers = sortedSuppliers.slice(startIndex, endIndex)

  return (
    // xs applies on small screens, while md applies on medium screens and larger.
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      <Stack spacing={{ xs: 2, md: 3 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{
            alignItems: { sm: 'center' },
            justifyContent: 'space-between',
          }}
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
            Suppliers
          </Typography>
          {isAdmin && (
            <Button
              component={Link}
              to="/suppliers/new"
              variant="contained"
              sx={{ alignSelf: { xs: 'flex-start', sm: 'auto' } }}
            >
              Add Supplier
            </Button>
          )}
        </Stack>

        <TextField
          fullWidth
          placeholder="Search suppliers"
          value={searchText}
          onChange={(event) => {
            setSearchText(event.target.value)
            setPage(1)
          }}
          slotProps={{ htmlInput: { 'aria-label': 'Search suppliers' } }}
          sx={{ maxWidth: 480 }}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth sx={{ maxWidth: 240 }}>
            <InputLabel id="supplier-type-label">Supplier type</InputLabel>
            <Select
              labelId="supplier-type-label"
              value={selectedType}
              label="Supplier type"
              onChange={(event) => {
                setSelectedType(event.target.value)
                setPage(1)
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Printing">Printing</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ maxWidth: 240 }}>
            <InputLabel id="supplier-sort-label">Sort by</InputLabel>
            <Select
              labelId="supplier-sort-label"
              value={selectedSort}
              label="Sort by"
              onChange={(event) => setSelectedSort(event.target.value)}
            >
              <MenuItem value="name-asc">Name A-Z</MenuItem>
              <MenuItem value="name-desc">Name Z-A</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Box aria-label="Supplier results" sx={{ minHeight: { xs: 320, md: 480 } }}>
          <Stack spacing={{ xs: 2, md: 3 }}>
            {sortedSuppliers.length > 0 ? (
              paginatedSuppliers.map((supplier) => (
                <SupplierCard
                  key={supplier.id}
                  id={supplier.id}
                  name={supplier.name}
                  type={supplier.type}
                  location={supplier.location}
                  operatingHours={supplier.operatingHours}
                />
              ))
            ) : (
              <Typography color="text.secondary">No suppliers found</Typography>
            )}

            {pageCount > 0 && (
              <Pagination
                count={pageCount}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
                color="primary"
              />
            )}
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}

export default SupplierListPage
