import { Toaster } from 'sonner';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ThemeProvider from './components/ThemeProvider';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { SuperAdminRoute } from './components/layout/SuperAdminRoute';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Login } from './pages/auth/Login/index';
import { Register } from './pages/auth/Register/index';
import { ForgotPassword } from './pages/auth/ForgotPassword/index';
import { Dashboard } from './pages/dashboard/Dashboard/index';
import { Profile } from './pages/dashboard/Profile/index';
import { Users } from './pages/dashboard/Users/index';
import { RegisterUser } from './pages/admin/RegisterUser/index';

const GuestRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/home/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-center" richColors />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<DashboardLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="users" element={<Users />} />
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
