import { CssBaseline } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CreateSupplierPage from './pages/CreateSupplierPage'
import SupplierDetailPage from './pages/SupplierDetailPage'
import SupplierListPage from './pages/SupplierListPage'

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Navigate to="/suppliers" replace />} />
        <Route path="/suppliers" element={<SupplierListPage />} />
        <Route path="/suppliers/new" element={<CreateSupplierPage />} />
        <Route path="/suppliers/:supplierId" element={<SupplierDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
