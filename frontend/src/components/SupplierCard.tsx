import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

// These props describe the supplier information that the card accepts.
type SupplierCardProps = {
  id: number
  name: string
  type: string
  location: string
  // The question mark means this value is optional.
  operatingHours?: string
}

function SupplierCard({
  id,
  name,
  type,
  location,
  operatingHours,
}: SupplierCardProps) {
  return (
    <Card variant="outlined" sx={{ width: '100%', maxWidth: 640 }}>
      <CardContent>
        <Stack spacing={1}>
          <Typography component="h2" variant="h5" sx={{ fontWeight: 600 }}>
            {name}
          </Typography>
          <Typography color="text.secondary">Type: {type}</Typography>
          <Typography color="text.secondary">Location: {location}</Typography>
          {/* Only show operating hours when they were provided. */}
          {operatingHours && (
            <Typography color="text.secondary">
              Hours: {operatingHours}
            </Typography>
          )}
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button component={Link} to={`/suppliers/${id}`} variant="contained">
          View Details
        </Button>
      </CardActions>
    </Card>
  )
}

export default SupplierCard
