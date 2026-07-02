import { NavLink, useNavigate } from 'react-router-dom';
import { clearToken } from '../utils/auth';

const menuItems = [
  { label: 'Overview', path: '' },
  { label: 'Billing', path: 'billing' },
  { label: 'Payments', path: 'payments' },
  { label: 'Reservations', path: 'reservations' },
  { label: 'Receivables', path: 'receivables' },
  { label: 'Messages', path: 'messages' },
  { label: 'Transactions', path: 'transactions' },
];

const generalItems = [
  { label: 'Settings', path: 'settings' },
  { label: 'Security', path: 'security' },
];

function SidebarIcon({ type }) {
  return <span className={`sidebar-icon icon-${type}`} aria-hidden="true" />;
}

export default function DashboardSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/');
  };

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-brand"><span className="brand-spark" />EUTELIA</div>
      <div className="sidebar-section">Menu</div>
      {menuItems.map(({ label, path }) => (
        <NavLink
          to={`/dashboard/${path}`}
          end={path === ''}
          className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          key={label}
        >
          <SidebarIcon type={label.toLowerCase()} />
          <span>{label}</span>
          {label === 'Messages' && <em>13</em>}
        </NavLink>
      ))}
      <div className="sidebar-divider" />
      <div className="sidebar-section">General</div>
      {generalItems.map(({ label, path }) => (
        <NavLink
          to={`/dashboard/${path}`}
          className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          key={label}
        >
          <SidebarIcon type={label.toLowerCase()} />
          <span>{label}</span>
        </NavLink>
      ))}
      <div className="sidebar-divider" />
      <div className="sidebar-profile">
        <div className="profile-stack">
          <div className="profile-avatar">E</div>
          <div>
            <div className="profile-name">Eutelia Admin</div>
            <div className="profile-email">admin@euteliahotel.com</div>
          </div>
        </div>
      </div>
      <div className="sidebar-footer">
        <button type="button" className="sidebar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
