import { Toaster } from 'sonner';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ThemeProvider from './components/ThemeProvider';
import { AuthProvider } from './contexts/AuthContext';
import ThemeProvider from './components/ThemeProvider';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { SuperAdminRoute } from './components/layout/SuperAdminRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Login } from './pages/auth/Login/index';
import { Register } from './pages/auth/Register/index';
import { Dashboard } from './pages/dashboard/Dashboard/index';
import { Settings } from './pages/dashboard/Settings/index';
import { RegisterUser } from './pages/admin/RegisterUser/index';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-center" richColors />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<DashboardLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="settings" element={<Settings />} />
                <Route
                  path="register-user"
                  element={
                    <SuperAdminRoute>
                      <RegisterUser />
                    </SuperAdminRoute>
                  }
                />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/home/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
