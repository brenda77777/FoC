import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'

const quickActions = [
  {
    title: 'Browse Suppliers',
    description: 'Find food, printing, and other useful campus services.',
    to: '/suppliers',
    iconPath:
      'M4 4h16v2H4V4Zm-1 4h18l-1 5H4L3 8Zm2 7h14v6H5v-6Zm3 2v2h3v-2H8Z',
  },
  {
    title: 'My Requests',
    description: 'Order-related request tracking is under development.',
    to: '/requests',
    underDevelopment: true,
    iconPath:
      'M19 3h-4.18A3 3 0 0 0 9.18 3H5a2 2 0 0 0-2 2v16h18V5a2 2 0 0 0-2-2Zm-7-1a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm3 15H7v-2h8v2Zm2-4H7v-2h10v2Zm0-4H7V7h10v2Z',
  },
  {
    title: 'Account',
    description: 'Review your profile and available CampusGo roles.',
    to: '/account',
    iconPath:
      'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5.52 0-10 2.24-10 5v3h20v-3c0-2.76-4.48-5-10-5Z',
  },
]

function HomePage() {
  return (
    <Container component="main" maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
      <Stack spacing={{ xs: 3, md: 4 }}>
        <Stack spacing={0.5}>
          <Typography component="h1" variant="h4">
            Welcome to CampusGo
          </Typography>
          <Typography color="text.secondary">
            Browse campus services and access your requester or courier tools.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3, minmax(0, 1fr))',
            },
            gap: { xs: 2, md: 3 },
          }}
        >
          {quickActions.map((action, index) => (
            <Card
              key={action.to}
              variant="outlined"
              sx={{
                height: '100%',
                borderColor: 'divider',
                boxShadow: '0 8px 24px rgba(23, 35, 45, 0.05)',
              }}
            >
              <CardActionArea
                component={Link}
                to={action.to}
                sx={{ height: '100%', p: 0.5 }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        display: 'grid',
                        width: 48,
                        height: 48,
                        placeItems: 'center',
                        color: index === 1 ? 'secondary.main' : 'primary.main',
                        bgcolor:
                          index === 1 ? 'secondary.light' : 'primary.light',
                        borderRadius: 2.5,
                      }}
                    >
                      <SvgIcon aria-hidden="true">
                        <path d={action.iconPath} />
                      </SvgIcon>
                    </Box>

                    <Stack spacing={0.75}>
                      <Typography component="h2" variant="h6">
                        {action.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {action.description}
                      </Typography>
                    </Stack>

                    {action.underDevelopment && (
                      <Chip
                        label="Under development"
                        size="small"
                        color="secondary"
                        variant="outlined"
                        sx={{ alignSelf: 'flex-start' }}
                      />
                    )}
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        <Alert severity="info" variant="outlined">
          Order-related workflows are still under development.
        </Alert>
      </Stack>
    </Container>
  )
}

export default HomePage
