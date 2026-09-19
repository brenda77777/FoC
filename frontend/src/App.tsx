import { Box, CssBaseline } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppNavigation from './components/AppNavigation'
import CreateSupplierPage from './pages/CreateSupplierPage'
import EditSupplierPage from './pages/EditSupplierPage'
import SupplierDetailPage from './pages/SupplierDetailPage'
import SupplierListPage from './pages/SupplierListPage'

// TODO: Replace this preview value with role information from the team's User Service/auth integration.
const TEMPORARY_IS_ADMIN = false

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Box sx={{ minHeight: '100svh', pb: { xs: 8, md: 0 } }}>
        <AppNavigation />
        <Routes>
          <Route path="/" element={<Navigate to="/suppliers" replace />} />
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
    </BrowserRouter>
  )
}

export default App
