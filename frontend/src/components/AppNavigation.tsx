import { useState } from 'react'
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Paper,
  SvgIcon,
  Toolbar,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

type UserMode = 'requester' | 'courier'

const navigationItems = [
  {
    label: 'Home',
    value: 'home',
    path: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5Z',
  },
  {
    label: 'Suppliers',
    value: 'suppliers',
    path: 'M4 4h16v2H4V4Zm-1 4h18l-1 5H4L3 8Zm2 7h14v6H5v-6Zm3 2v2h3v-2H8Z',
  },
  {
    label: 'My Requests',
    value: 'requests',
    path: 'M19 3h-4.18A3 3 0 0 0 9.18 3H5a2 2 0 0 0-2 2v16h18V5a2 2 0 0 0-2-2Zm-7-1a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm3 15H7v-2h8v2Zm2-4H7v-2h10v2Zm0-4H7V7h10v2Z',
  },
  {
    label: 'Account',
    value: 'account',
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
  const activeStyle = {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
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
  const suppliersIsActive = location.pathname.startsWith('/suppliers')

  // TODO: Load and persist the active mode through the team's User Service.
  const [mode, setMode] = useState<UserMode>('requester')

  function handleModeChange(newMode: UserMode) {
    setMode(newMode)
  }

  return (
    <>
      <AppBar
        component="nav"
        position="sticky"
        color="default"
        elevation={1}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        <Toolbar sx={{ justifyContent: 'center', gap: 2 }}>
          <ModeToggle mode={mode} onChange={handleModeChange} />

          {navigationItems.map((item) => {
            const isSuppliers = item.value === 'suppliers'

            return (
              <Button
                key={item.value}
                component={isSuppliers ? Link : 'button'}
                to={isSuppliers ? '/suppliers' : undefined}
                startIcon={<NavigationIcon path={item.path} />}
                variant={
                  isSuppliers && suppliersIsActive ? 'contained' : 'text'
                }
                color={isSuppliers && suppliersIsActive ? 'primary' : 'inherit'}
              >
                {item.label}
              </Button>
            )
          })}
        </Toolbar>
      </AppBar>

      <Paper
        component="section"
        square
        elevation={1}
        aria-label="Choose user mode"
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          p: 1,
        }}
      >
        <ModeToggle mode={mode} onChange={handleModeChange} />
      </Paper>

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
        }}
      >
        <BottomNavigation
          showLabels
          value={suppliersIsActive ? 'suppliers' : false}
        >
          {navigationItems.map((item) => {
            const isSuppliers = item.value === 'suppliers'

            return (
              <BottomNavigationAction
                key={item.value}
                component={isSuppliers ? Link : 'button'}
                to={isSuppliers ? '/suppliers' : undefined}
                label={item.label}
                value={item.value}
                icon={<NavigationIcon path={item.path} />}
              />
            )
          })}
        </BottomNavigation>
      </Paper>
    </>
  )
}

export default AppNavigation
