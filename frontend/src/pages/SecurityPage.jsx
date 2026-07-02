import { useState } from 'react';
import DashboardPanel from '../components/DashboardPanel';

const users = [
  { name: 'Eutelia Admin', role: 'Administrator', status: 'Active' },
  { name: 'Front Desk', role: 'Manager', status: 'Active' },
  { name: 'Billing Agent', role: 'User', status: 'Restricted' },
];

export default function SecurityPage() {
  const [notice, setNotice] = useState('Update access controls and review recent system audit items.');

  return (
    <div>
      <section className="dashboard-header">
        <div>
          <h1>Security</h1>
          <p>Manage roles, authentication, and audit settings for secure billing operations.</p>
        </div>
        <button className="add-product" type="button" onClick={() => setNotice('Audit review started.')}>Review Audit</button>
      </section>

      <div className="dashboard-notice">{notice}</div>

      <div className="split-grid">
        <DashboardPanel title="Access Control" description="Review user roles and account privileges.">
          <div className="security-grid">
            {users.map((user) => (
              <div className="security-card" key={user.name}>
                <h4>{user.name}</h4>
                <p>{user.role}</p>
                <span className={`status-pill ${user.status.toLowerCase()}`}>{user.status}</span>
              </div>
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel title="Authentication Settings" description="Enable multi-factor authentication and password policies.">
          <div className="settings-grid">
            <label className="toggle-field">
              <span>Multi-factor authentication</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="toggle-field">
              <span>Password expiration</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="toggle-field">
              <span>Session timeout</span>
              <input type="checkbox" defaultChecked />
            </label>
          </div>
        </DashboardPanel>
      </div>
    </div>
  );
}
