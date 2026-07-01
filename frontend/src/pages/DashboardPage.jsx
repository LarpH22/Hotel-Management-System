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

export default function DashboardPage() {
  return (
    <div className="dashboard-shell">
      <DashboardSidebar />
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="sales-admin">Billing Dashboard <span>⌄</span></div>
          <label className="dashboard-search">
            <input placeholder="Search invoices, guests, transactions..." />
            <span>🔍</span>
          </label>
          <button className="round-action">🔔</button>
          <button className="round-action">⚙</button>
          <button className="add-product">New Invoice <span>+</span></button>
        </header>

        <section className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Monitor guest billing, receivables, and financial performance from one elegant view.</p>
          </div>
          <button className="date-filter">January 2024 - May 2024 <span>⌄</span></button>
        </section>

        <section className="dashboard-grid">
          <article className="update-card">
            <div className="update-header">
              <span className="update-dot" /> Update
              <small>May 10th 2024</small>
            </div>
            <h2>Receivables recovery improved 22% this month</h2>
            <a href="#stats">View Collection Details &gt;</a>
          </article>

          <article className="metric-tile">
            <button aria-label="More">...</button>
            <p>Net Income</p>
            <h2><span>$</span>193.000</h2>
            <small className="good">+35% from last month</small>
          </article>

          <article className="metric-tile">
            <button aria-label="More">...</button>
            <p>Outstanding Receivables</p>
            <h2><span>$</span>32.000</h2>
            <small className="bad">-12% from last month</small>
          </article>

          <article className="view-card">
            <div className="card-title-row">
              <h3>Guest Billing Overview</h3>
              <button>...</button>
            </div>
            <div className="donut-chart">
              <span className="donut-badge badge-one">16%</span>
              <span className="donut-badge badge-two">23%</span>
              <span className="donut-badge badge-three">68%</span>
              <div className="donut-center"><small>Booked Rooms</small><strong>565K</strong></div>
            </div>
            <p>Review the most recent billing mix and guest spend patterns.</p>
            <button className="guide-button">View Report</button>
            <div className="donut-legend">
              <span><i className="lime" />Room Charges</span>
              <span><i className="green" />Services</span>
              <span><i className="orange" />Extras</span>
            </div>
          </article>

          <article className="transaction-card">
            <div className="card-title-row"><h3>Recent Invoices</h3><button>...</button></div>
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
            <div className="card-title-row"><h3>Payment Report</h3><button>...</button></div>
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
            <button>Upgrade Plan</button>
          </article>
        </section>
      </main>
    </div>
  );
}
