import { useState } from 'react';
import DashboardPanel from '../components/DashboardPanel';

export default function SettingsPage() {
  const [notice, setNotice] = useState('Update billing preferences and account settings for your hotel operations.');

  return (
    <div>
      <section className="dashboard-header">
        <div>
          <h1>Settings</h1>
          <p>Adjust billing operations, notifications, and reporting for your hotel billing system.</p>
        </div>
        <button className="add-product" type="button" onClick={() => setNotice('Settings saved successfully.')}>Save Changes</button>
      </section>

      <div className="dashboard-notice">{notice}</div>

      <div className="split-grid">
        <DashboardPanel title="General Settings" description="Configure billing defaults, currency, and invoice templates.">
          <form
            className="dashboard-form-grid"
            onSubmit={(event) => {
              event.preventDefault();
              setNotice('General settings have been applied.');
            }}
          >
            <label className="form-field">
              <span>Default Currency</span>
              <select defaultValue="USD">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </label>
            <label className="form-field">
              <span>Invoice Prefix</span>
              <input placeholder="INV" />
            </label>
            <label className="form-field full-width">
              <span>Invoice Notes</span>
              <textarea rows="4" placeholder="Add default invoice messaging" />
            </label>
            <button className="primary-button" type="submit">Apply Changes</button>
          </form>
        </DashboardPanel>

        <DashboardPanel title="Notification Settings" description="Control email and billing alerts for finance staff.">
          <div className="settings-grid">
            <label className="toggle-field">
              <span>Payment reminders</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="toggle-field">
              <span>Overdue alerts</span>
              <input type="checkbox" defaultChecked />
            </label>
            <label className="toggle-field">
              <span>Daily summary</span>
              <input type="checkbox" />
            </label>
          </div>
        </DashboardPanel>
      </div>
    </div>
  );
}
