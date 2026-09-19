import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import SupplierInfo from './SupplierInfo'

// These props describe the supplier information that the card accepts.
type SupplierCardProps = {
  id: number
  name: string
  type: string
  location: string
  // The question mark means this value is optional.
  operatingHours?: string
  imageUrl?: string
}

function SupplierCard({
  id,
  name,
  type,
  location,
  operatingHours,
  imageUrl,
}: SupplierCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        display: { xs: 'block', sm: 'flex' },
        width: '100%',
        maxWidth: 720,
        overflow: 'hidden',
      }}
    >
      {imageUrl ? (
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          sx={{ width: { xs: '100%', sm: 200 }, height: { xs: 180, sm: 'auto' } }}
        />
      ) : (
        <Box
          role="img"
          aria-label={`${name} placeholder image`}
          sx={{
            display: 'grid',
            width: { xs: '100%', sm: 200 },
            height: { xs: 180, sm: 'auto' },
            minHeight: { sm: 180 },
            flexShrink: 0,
            placeItems: 'center',
            color: 'text.secondary',
            bgcolor: 'action.hover',
          }}
        >
          <SvgIcon sx={{ fontSize: 56 }} aria-hidden="true">
            <path d="M4 4h16v2H4V4Zm-1 4h18l-1 5H4L3 8Zm2 7h14v6H5v-6Zm3 2v2h3v-2H8Z" />
          </SvgIcon>
        </Box>
      )}

      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <CardContent sx={{ flex: 1 }}>
          <Stack spacing={1.5}>
            <Typography component="h2" variant="h5" sx={{ fontWeight: 600 }}>
              {name}
            </Typography>
            <Typography color="text.secondary">Type: {type}</Typography>
            <SupplierInfo
              location={location}
              operatingHours={operatingHours}
            />
          </Stack>
        </CardContent>

        <CardActions sx={{ px: 2, pb: 2 }}>
          <Button component={Link} to={`/suppliers/${id}`} variant="contained">
            View Details
          </Button>
        </CardActions>
      </Box>
    </Card>
  )
}

export default SupplierCard
