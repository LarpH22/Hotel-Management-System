import { NavLink } from 'react-router-dom';

const menuItems = [
  ['Overview', 'grid'],
  ['Invoices', 'bill'],
  ['Payments', 'credit-card'],
  ['Receivables', 'wallet'],
  ['Messages', 'mail'],
  ['Transactions', 'bag'],
];

const generalItems = [
  ['Settings', 'gear'],
  ['Security', 'shield'],
];

function SidebarIcon({ type }) {
  return <span className={`sidebar-icon icon-${type}`} aria-hidden="true" />;
}

export default function DashboardSidebar() {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-brand"><span className="brand-spark" />EUTELIA</div>
      <div className="sidebar-section">Menu</div>
      {menuItems.map(([label, icon], index) => (
        <NavLink to="/dashboard" className={`sidebar-link ${index === 0 ? 'active' : ''}`} key={label}>
          <SidebarIcon type={icon} />
          <span>{label}</span>
          {label === 'Messages' && <em>13</em>}
        </NavLink>
      ))}
      <div className="sidebar-divider" />
      <div className="sidebar-section">General</div>
      {generalItems.map(([label, icon]) => (
        <NavLink to="/dashboard" className="sidebar-link" key={label}>
          <SidebarIcon type={icon} />
          <span>{label}</span>
        </NavLink>
      ))}
      <div className="sidebar-profile">
        <div className="profile-avatar">E</div>
        <div>
          <div className="profile-name">Eutelia Admin</div>
          <div className="profile-email">admin@euteliahotel.com</div>
        </div>
      </div>
    </aside>
  );
}
