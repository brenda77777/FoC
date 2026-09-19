import { useState } from 'react'
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  SvgIcon,
  Toolbar,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'

type UserMode = 'requester' | 'courier'

const navigationItems = [
  {
    label: 'Home',
    value: 'home',
    to: '/home',
    path: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5Z',
  },
  {
    label: 'Suppliers',
    value: 'suppliers',
    to: '/suppliers',
    path: 'M4 4h16v2H4V4Zm-1 4h18l-1 5H4L3 8Zm2 7h14v6H5v-6Zm3 2v2h3v-2H8Z',
  },
  {
    label: 'My Requests',
    value: 'requests',
    to: '/requests',
    path: 'M19 3h-4.18A3 3 0 0 0 9.18 3H5a2 2 0 0 0-2 2v16h18V5a2 2 0 0 0-2-2Zm-7-1a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm3 15H7v-2h8v2Zm2-4H7v-2h10v2Zm0-4H7V7h10v2Z',
  },
  {
    label: 'Account',
    value: 'account',
    to: '/account',
    path: 'M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-5.52 0-10 2.24-10 5v3h20v-3c0-2.76-4.48-5-10-5Z',
  },
]

function NavigationIcon({ path }: { path: string }) {
  return (
    <SvgIcon aria-hidden="true">
      <path d={path} />
    </SvgIcon>
  )
}

function ModeToggle({
  mode,
  onChange,
}: {
  mode: UserMode
  onChange: (newMode: UserMode) => void
}) {
  const theme = useTheme()
  const activePalette =
    mode === 'requester' ? theme.palette.primary : theme.palette.secondary
  const activeStyle = {
    color: activePalette.contrastText,
    backgroundColor: activePalette.main,
  }

  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={mode}
      aria-label="User mode"
      sx={{ width: { xs: '100%', md: 'auto' } }}
    >
      <ToggleButton
        value="requester"
        onClick={() => onChange('requester')}
        style={mode === 'requester' ? activeStyle : undefined}
        sx={{ flex: { xs: 1, md: 'initial' } }}
      >
        Requester
      </ToggleButton>
      <ToggleButton
        value="courier"
        onClick={() => onChange('courier')}
        style={mode === 'courier' ? activeStyle : undefined}
        sx={{ flex: { xs: 1, md: 'initial' } }}
      >
        Courier
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

function AppNavigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const activeNavigationItem =
    navigationItems.find((item) => {
      if (item.value === 'suppliers') {
        return location.pathname.startsWith('/suppliers')
      }

      return location.pathname === item.to
    })?.value ?? false

  // TODO: Load and persist the active mode through the team's User Service.
  const [mode, setMode] = useState<UserMode>('requester')
  const [mobileMenuAnchor, setMobileMenuAnchor] =
    useState<HTMLElement | null>(null)

  function handleModeChange(newMode: UserMode) {
    setMode(newMode)
  }

  function handleLogout() {
    setMobileMenuAnchor(null)

    // TODO: Replace this navigation-only logout with real authenticated session
    // handling through the team's existing User Service.
    navigate('/login')
  }

  return (
    <>
      <AppBar
        component="nav"
        position="sticky"
        color="default"
        elevation={0}
        sx={{
          display: { xs: 'none', md: 'block' },
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'rgba(255, 255, 255, 0.96)',
        }}
      >
        <Toolbar
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 2,
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'center', justifySelf: 'start' }}
          >
            <Typography
              sx={{
                display: { md: 'none', lg: 'block' },
                color: 'primary.main',
                fontSize: '1.1rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
            >
              CampusGo
            </Typography>
            <ModeToggle mode={mode} onChange={handleModeChange} />
          </Stack>

          <Stack direction="row" spacing={1}>
            {navigationItems.map((item) => {
              const isActive = item.value === activeNavigationItem

              return (
                <Button
                  key={item.value}
                  component={Link}
                  to={item.to}
                  startIcon={<NavigationIcon path={item.path} />}
                  variant={isActive ? 'contained' : 'text'}
                  color={isActive ? 'primary' : 'inherit'}
                >
                  {item.label}
                </Button>
              )
            })}
          </Stack>

          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{ justifySelf: 'end' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Paper
        component="section"
        square
        elevation={1}
        aria-label="Application controls"
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          px: 1.5,
          py: 1,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Stack spacing={1}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography
              sx={{
                color: 'primary.main',
                fontSize: '1.05rem',
                fontWeight: 800,
              }}
            >
              CampusGo
            </Typography>
            <IconButton
              aria-label="Open account actions"
              aria-haspopup="menu"
              aria-expanded={mobileMenuAnchor ? 'true' : undefined}
              onClick={(event) => setMobileMenuAnchor(event.currentTarget)}
            >
              <SvgIcon aria-hidden="true">
                <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
              </SvgIcon>
            </IconButton>
          </Stack>
          <ModeToggle mode={mode} onChange={handleModeChange} />
        </Stack>
      </Paper>

      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={() => setMobileMenuAnchor(null)}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

      <Paper
        component="nav"
        square
        elevation={8}
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1200,
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <BottomNavigation
          showLabels
          value={activeNavigationItem}
        >
          {navigationItems.map((item) => (
            <BottomNavigationAction
              key={item.value}
              component={Link}
              to={item.to}
              label={item.label}
              value={item.value}
              icon={<NavigationIcon path={item.path} />}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </>
  )
}

export default AppNavigation
