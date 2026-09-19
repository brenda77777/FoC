import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
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
        maxWidth: 'none',
        overflow: 'hidden',
        borderColor: 'divider',
        borderRadius: 3,
        boxShadow: '0 8px 24px rgba(23, 35, 45, 0.06)',
        transition: 'transform 160ms ease, box-shadow 160ms ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 30px rgba(23, 35, 45, 0.1)',
        },
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
            color: 'primary.main',
            background:
              'linear-gradient(145deg, rgba(23, 63, 95, 0.08), rgba(42, 127, 122, 0.14))',
          }}
        >
          <SvgIcon sx={{ fontSize: 56 }} aria-hidden="true">
            <path d="M4 4h16v2H4V4Zm-1 4h18l-1 5H4L3 8Zm2 7h14v6H5v-6Zm3 2v2h3v-2H8Z" />
          </SvgIcon>
        </Box>
      )}

      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <CardContent sx={{ flex: 1, p: { xs: 2, md: 2.5 } }}>
          <Stack spacing={1.5}>
            <Typography component="h2" variant="h5" sx={{ fontWeight: 600 }}>
              {name}
            </Typography>
            <Chip
              label={type}
              size="small"
              color={type === 'Food' ? 'secondary' : 'primary'}
              variant="outlined"
              sx={{ alignSelf: 'flex-start' }}
            />
            <SupplierInfo
              location={location}
              operatingHours={operatingHours}
            />
          </Stack>
        </CardContent>

        <CardActions sx={{ px: { xs: 2, md: 2.5 }, pb: { xs: 2, md: 2.5 } }}>
          <Button
            component={Link}
            to={`/suppliers/${id}`}
            variant="contained"
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            View Details
          </Button>
        </CardActions>
      </Box>
    </Card>
  )
}

export default SupplierCard
