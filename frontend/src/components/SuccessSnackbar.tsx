import { Alert, Snackbar } from '@mui/material'

type SuccessSnackbarProps = {
  open: boolean
  message: string
  onClose: () => void
}

function SuccessSnackbar({
  open,
  message,
  onClose,
}: SuccessSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity="success"
        variant="filled"
        onClose={onClose}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SuccessSnackbar
