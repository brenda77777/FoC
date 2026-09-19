import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material'

export type SupplierListStatusType =
  | 'loading'
  | 'empty'
  | 'no-results'
  | 'error'

type SupplierListStatusProps = {
  status: SupplierListStatusType
}

function SupplierListStatus({ status }: SupplierListStatusProps) {
  if (status === 'loading') {
    return (
      <Box role="status" sx={{ py: 6, textAlign: 'center' }}>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <CircularProgress />
          <Typography color="text.secondary">Loading suppliers...</Typography>
        </Stack>
      </Box>
    )
  }

  if (status === 'error') {
    return (
      <Alert severity="error">
        Suppliers could not be loaded. Please try again later.
      </Alert>
    )
  }

  if (status === 'empty') {
    return (
      <Alert severity="info">
        No suppliers are available yet.
      </Alert>
    )
  }

  return (
    <Alert severity="info">
      No suppliers found. Try changing your search or supplier type.
    </Alert>
  )
}

export default SupplierListStatus
