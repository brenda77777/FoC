import { useState, type FormEvent } from 'react'
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { sampleSuppliers } from './SupplierListPage'

function EditSupplierPage() {
  const { supplierId } = useParams()
  const supplier = sampleSuppliers.find(
    (item) => item.id === Number(supplierId),
  )

  // The existing supplier values become the form's initial state.
  const [formValues, setFormValues] = useState({
    supplierName: supplier?.name ?? '',
    type: supplier?.type ?? '',
    location: supplier?.location ?? '',
    operatingHours: supplier?.operatingHours ?? '',
  })

  const [errors, setErrors] = useState({
    supplierName: false,
    type: false,
    location: false,
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newErrors = {
      supplierName: formValues.supplierName.trim() === '',
      type: formValues.type === '',
      location: formValues.location.trim() === '',
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some((hasError) => hasError)) {
      return
    }

    // TODO: Send the validated updates to the team's existing Supplier Service API.
  }

  if (!supplier) {
    return (
      <Container component="main" maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
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
    <Container component="main" maxWidth="sm" sx={{ py: { xs: 3, md: 6 } }}>
      <Stack spacing={3}>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
          Edit Supplier
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
            <Stack spacing={3}>
              <TextField
                required
                label="Supplier Name"
                value={formValues.supplierName}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    supplierName: event.target.value,
                  })
                }
                error={errors.supplierName}
                helperText={
                  errors.supplierName ? 'Supplier name is required' : ''
                }
              />

              <FormControl required error={errors.type}>
                <InputLabel id="edit-supplier-type-label">Type</InputLabel>
                <Select
                  labelId="edit-supplier-type-label"
                  label="Type"
                  value={formValues.type}
                  onChange={(event) =>
                    setFormValues({ ...formValues, type: event.target.value })
                  }
                >
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Printing">Printing</MenuItem>
                </Select>
                {errors.type && <FormHelperText>Type is required</FormHelperText>}
              </FormControl>

              <TextField
                required
                label="Location"
                value={formValues.location}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    location: event.target.value,
                  })
                }
                error={errors.location}
                helperText={errors.location ? 'Location is required' : ''}
              />

              <TextField
                label="Operating Hours"
                value={formValues.operatingHours}
                onChange={(event) =>
                  setFormValues({
                    ...formValues,
                    operatingHours: event.target.value,
                  })
                }
              />

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button type="submit" variant="contained">
                  Save Changes
                </Button>
                <Button
                  component={Link}
                  to={`/suppliers/${supplier.id}`}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </form>
      </Stack>
    </Container>
  )
}

export default EditSupplierPage
