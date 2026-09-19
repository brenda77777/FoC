import { Box, CssBaseline } from '@mui/material'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import AppNavigation from './components/AppNavigation'
import AccountPage from './pages/AccountPage.tsx'
import CreateSupplierPage from './pages/CreateSupplierPage.tsx'
import EditSupplierPage from './pages/EditSupplierPage.tsx'
import HomePage from './pages/HomePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import MyRequestsPage from './pages/MyRequestsPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import SupplierDetailPage from './pages/SupplierDetailPage.tsx'
import SupplierListPage from './pages/SupplierListPage'

// TODO: Replace this preview value with role information from the team's User Service/auth integration.
const TEMPORARY_IS_ADMIN = false

function AppContent() {
  const location = useLocation()
  const isPublicPage =
    location.pathname === '/login' || location.pathname === '/register'

  return (
    <Box
      sx={{
        minHeight: '100svh',
        pb: isPublicPage ? 0 : { xs: 8, md: 0 },
      }}
    >
      {!isPublicPage && <AppNavigation />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/requests" element={<MyRequestsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route
          path="/suppliers"
          element={<SupplierListPage isAdmin={TEMPORARY_IS_ADMIN} />}
        />
        <Route path="/suppliers/new" element={<CreateSupplierPage />} />
        <Route
          path="/suppliers/:supplierId/edit"
          element={<EditSupplierPage />}
        />
        <Route
          path="/suppliers/:supplierId"
          element={<SupplierDetailPage isAdmin={TEMPORARY_IS_ADMIN} />}
        />
      </Routes>
    </Box>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppContent />
    </BrowserRouter>
  )
}

export default App
