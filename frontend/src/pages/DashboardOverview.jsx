import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const transactions = [
  ['Invoice #10222 · Deluxe Suite', 'Jul 12th 2024', 'Completed'],
  ['Invoice #10223 · Spa Package', 'Jul 12th 2024', 'Pending'],
  ['Invoice #10224 · Dining Event', 'Jul 12th 2024', 'Completed'],
  ['Invoice #10225 · Conference Hall', 'Jul 12th 2024', 'Pending'],
  ['Invoice #10226 · Presidential Suite', 'Jul 12th 2024', 'Completed'],
  ['Invoice #10227 · Room Service', 'Jul 12th 2024', 'Completed'],
  ['Invoice #10228 · Airport Transfer', 'Jul 12th 2024', 'Completed'],
];

export default function DashboardOverview() {
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('Everything is live and ready to explore.');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    setNotice(query ? `Searching for “${query}” across invoices, payments and reservations.` : 'Enter a search term to begin.');
  };

  const handleAction = (label, route) => {
    setNotice(`${label} clicked.`);
    if (route) {
      navigate(route);
    }
  };

  return (
    <>
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
        <button className="round-action" type="button" onClick={() => handleAction('Settings', '/dashboard/settings')}>⚙</button>
        <button className="add-product" type="button" onClick={() => handleAction('New Invoice', '/dashboard/billing')}>New Invoice <span>+</span></button>
      </header>

      <section className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Monitor guest billing, receivables, and financial performance from one elegant view.</p>
        </div>
        <button className="date-filter" type="button" onClick={() => handleAction('Date filter')}>January 2024 - May 2024 <span>⌄</span></button>
      </section>

      <div className="dashboard-notice">{notice}</div>

      <section className="overview-top-grid">
        <div className="overview-left-column">
          <article className="update-card overview-update-card update-hover-card">
            <div className="update-header">
              <span className="update-dot" /> Recent Transactions
              <small>Hover to expand</small>
            </div>
            <div className="update-summary">
              <p>Hover here to view the latest booking and invoice activity in one place.</p>
            </div>
            <div className="update-transactions">
              <ul>
                {transactions.map(([name, date, status]) => (
                  <li key={name}>
                    <div>
                      <strong>{name}</strong>
                      <small>{date}</small>
                    </div>
                    <em className={status === 'Pending' ? 'pending' : ''}>{status}</em>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="view-card overview-chart-card">
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
        </div>

        <div className="overview-right-column">
          <div className="overview-right-cards">
            <article className="metric-tile overview-stat-card">
              <button type="button" aria-label="More" onClick={() => handleAction('Net income details')}>...</button>
              <p>Net Income</p>
              <h2><span>$</span>193.000</h2>
              <small className="good">+35% from last month</small>
            </article>

            <article className="metric-tile overview-stat-card">
              <button type="button" aria-label="More" onClick={() => handleAction('Receivables details', '/dashboard/receivables')}>...</button>
              <p>Outstanding Receivables</p>
              <h2><span>$</span>32.000</h2>
              <small className="bad">-12% from last month</small>
            </article>
          </div>

          <article className="revenue-card overview-side-card">
            <div className="card-title-row">
              <div>
                <h3>Revenue</h3>
                <h2>$193.000 <small className="good">+35% from last month</small></h2>
              </div>
              <button type="button" onClick={() => handleAction('Revenue details')}>...</button>
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

          <article className="level-card overview-side-card">
            <span className="leaf-mark" />
            <h3>Secure your next level of hospitality billing.</h3>
            <p>Upgrade your finance workflow and maintain premium guest service with accurate billing.</p>
            <button type="button" onClick={() => handleAction('Upgrade plan', '/dashboard/settings')}>Upgrade Plan</button>
          </article>
        </div>
      </section>
    </>
  );
}
