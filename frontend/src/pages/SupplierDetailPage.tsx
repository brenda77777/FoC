import { useState } from 'react'
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { sampleSuppliers } from './SupplierListPage'

function SupplierDetailPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Route parameters are strings, so convert the ID to a number before comparing it.
  const { supplierId } = useParams()
  const supplier = sampleSuppliers.find(
    (item) => item.id === Number(supplierId),
  )

  function handleDelete() {
    // TODO: Delete this supplier through the team's existing Supplier Service.
    setIsDeleteDialogOpen(false)
  }

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
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/suppliers" variant="outlined">
            Back
          </Button>
          <Button
            component={Link}
            to={`/suppliers/${supplier.id}/edit`}
            variant="contained"
          >
            Edit
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Delete
          </Button>
        </Stack>

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

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete {supplier.name}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this supplier?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default SupplierDetailPage
