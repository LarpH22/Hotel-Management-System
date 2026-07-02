import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

export default function DashboardLayout() {
  return (
    <div className="dashboard-shell">
      <DashboardSidebar />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
}
