import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import BillingPage from './pages/BillingPage';
import PaymentsPage from './pages/PaymentsPage';
import ReservationsPage from './pages/ReservationsPage';
import ReceivablesPage from './pages/ReceivablesPage';
import MessagesPage from './pages/MessagesPage';
import TransactionsPage from './pages/TransactionsPage';
import SettingsPage from './pages/SettingsPage';
import SecurityPage from './pages/SecurityPage';
import { getToken } from './utils/auth';

function ProtectedRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="reservations" element={<ReservationsPage />} />
        <Route path="receivables" element={<ReceivablesPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="security" element={<SecurityPage />} />
      </Route>
    </Routes>
  );
}
