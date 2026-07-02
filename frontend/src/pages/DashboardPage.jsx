import { useState } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';

const transactions = [
  ['Invoice #10222 · Deluxe Suite', 'Jul 12th 2024', 'Completed'],
  ['Invoice #10223 · Spa Package', 'Jul 12th 2024', 'Pending'],
  ['Invoice #10224 · Dining Event', 'Jul 12th 2024', 'Completed'],
  ['Invoice #10225 · Conference Hall', 'Jul 12th 2024', 'Pending'],
  ['Invoice #10226 · Presidential Suite', 'Jul 12th 2024', 'Completed'],
  ['Invoice #10227 · Room Service', 'Jul 12th 2024', 'Completed'],
  ['Invoice #10228 · Airport Transfer', 'Jul 12th 2024', 'Completed'],
];

const featureDetails = {
  Overview: 'See your overall billing health, summaries, and alerts.',
  Invoices: 'Manage all invoices, create new billing records, and view history.',
  Payments: 'Track received payments and reconcile them with invoices.',
  Receivables: 'Review outstanding balances and collection statuses.',
  Messages: 'View billing-related notes, alerts, and communication items.',
  Transactions: 'Inspect payment transactions and reconcile guest charges.',
  Settings: 'Adjust account and billing preferences for your hotel team.',
  Security: 'Update security settings and manage access controls.',
};

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('Overview');
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('Everything is live and ready to explore.');

  const handleSelectSection = (label) => {
    setActiveSection(label);
    setNotice(featureDetails[label] || `${label} is active.`);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    if (!query) {
      setNotice('Enter a search term to begin.');
      return;
    }
    setNotice(`Searching for “${query}” in ${activeSection}.`);
  };

  const handleAction = (label) => {
    setNotice(`${label} clicked. That feature is now active.`);
  };

  return (
    <div className="dashboard-shell">
      <DashboardSidebar activeItem={activeSection} onSelectItem={handleSelectSection} />
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="sales-admin">Billing Dashboard <span>⌄</span></div>
          <form className="dashboard-search" onSubmit={handleSearch}>
            <input
              placeholder="Search invoices, guests, transactions..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <button type="submit" aria-label="Search">🔍</button>
          </form>
          <button className="round-action" type="button" onClick={() => handleAction('Notifications')}>🔔</button>
          <button className="round-action" type="button" onClick={() => handleAction('Settings')}>⚙</button>
          <button className="add-product" type="button" onClick={() => handleAction('New Invoice')}>New Invoice <span>+</span></button>
        </header>

        <section className="dashboard-header">
          <div>
            <h1>{activeSection}</h1>
            <p>{featureDetails[activeSection]}</p>
          </div>
          <button className="date-filter" type="button" onClick={() => handleAction('Date filter')}>January 2024 - May 2024 <span>⌄</span></button>
        </section>

        <div className="dashboard-notice">{notice}</div>

        <section className="dashboard-grid">
          <article className="update-card">
            <div className="update-header">
              <span className="update-dot" /> Update
              <small>May 10th 2024</small>
            </div>
            <h2>Receivables recovery improved 22% this month</h2>
            <button type="button" className="link-button" onClick={() => handleAction('Collection details')}>View Collection Details &gt;</button>
          </article>

          <article className="metric-tile">
            <button type="button" aria-label="More" onClick={() => handleAction('Net income details')}>...</button>
            <p>Net Income</p>
            <h2><span>$</span>193.000</h2>
            <small className="good">+35% from last month</small>
          </article>

          <article className="metric-tile">
            <button type="button" aria-label="More" onClick={() => handleAction('Receivables details')}>...</button>
            <p>Outstanding Receivables</p>
            <h2><span>$</span>32.000</h2>
            <small className="bad">-12% from last month</small>
          </article>

          <article className="view-card">
            <div className="card-title-row">
              <h3>Guest Billing Overview</h3>
              <button type="button" onClick={() => handleAction('Billing overview')}>...</button>
            </div>
            <div className="donut-chart">
              <span className="donut-badge badge-one">16%</span>
              <span className="donut-badge badge-two">23%</span>
              <span className="donut-badge badge-three">68%</span>
              <div className="donut-center"><small>Booked Rooms</small><strong>565K</strong></div>
            </div>
            <p>Review the most recent billing mix and guest spend patterns.</p>
            <button type="button" className="guide-button" onClick={() => handleAction('View report')}>View Report</button>
            <div className="donut-legend">
              <span><i className="lime" />Room Charges</span>
              <span><i className="green" />Services</span>
              <span><i className="orange" />Extras</span>
            </div>
          </article>

          <article className="transaction-card">
            <div className="card-title-row"><h3>Recent Invoices</h3><button type="button" onClick={() => handleAction('Recent invoices')}>...</button></div>
            <ul>
              {transactions.map(([name, date, status]) => (
                <li key={name}>
                  <span className="product-dot" />
                  <div>
                    <strong>{name}</strong>
                    <small>{date}</small>
                  </div>
                  <em className={status === 'Pending' ? 'pending' : ''}>{status}</em>
                </li>
              ))}
            </ul>
          </article>

          <article className="revenue-card">
            <div className="card-title-row">
              <div>
                <h3>Revenue</h3>
                <h2>$193.000 <small className="good">+35% from last month</small></h2>
              </div>
              <div className="mini-legend"><span />Income <span />Expenses</div>
            </div>
            <div className="bar-chart">
              {[72, 58, 82, 75, 90, 70].map((height, index) => (
                <div className="bar-pair" key={height + index}>
                  <span style={{ height: `${height}%` }} />
                  <i style={{ height: `${Math.max(38, height - 16)}%` }} />
                </div>
              ))}
            </div>
          </article>

          <article className="sales-report-card">
            <div className="card-title-row"><h3>Payment Report</h3><button type="button" onClick={() => handleAction('Payment report')}>...</button></div>
            <div className="sales-bars">
              <div><span style={{ width: '70%' }}>Room Charges (233)</span></div>
              <div><span style={{ width: '48%' }}>Services (123)</span></div>
              <div><span style={{ width: '92%' }}>Extras (482)</span></div>
            </div>
            <div className="sales-axis"><span>0</span><span>100</span><span>200</span><span>300</span><span>400</span></div>
          </article>

          <article className="level-card">
            <span className="leaf-mark" />
            <h3>Secure your next level of hospitality billing.</h3>
            <p>Upgrade your finance workflow and maintain premium guest service with accurate billing.</p>
            <button type="button" onClick={() => handleAction('Upgrade plan')}>Upgrade Plan</button>
          </article>
        </section>
      </main>
    </div>
  );
}
