import { useMemo, useState } from 'react';
import DashboardPanel from '../components/DashboardPanel';
import DashboardTable from '../components/DashboardTable';

const invoices = [
  { id: 'INV-10222', guest: 'Deluxe Suite', amount: '$1,450', status: 'Paid', date: 'Jul 12 2024', due: '0 days' },
  { id: 'INV-10223', guest: 'Spa Package', amount: '$560', status: 'Pending', date: 'Jul 12 2024', due: '4 days' },
  { id: 'INV-10224', guest: 'Dining Event', amount: '$780', status: 'Paid', date: 'Jul 12 2024', due: '0 days' },
  { id: 'INV-10225', guest: 'Conference Hall', amount: '$2,300', status: 'Pending', date: 'Jul 11 2024', due: '2 days' },
];

function StatusPill({ status }) {
  return <span className={`status-pill ${status.toLowerCase()}`}>{status}</span>;
}

export default function BillingPage() {
  const [filter, setFilter] = useState('All');
  const [notice, setNotice] = useState('Manage invoice billing from a single dashboard.');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showNewInvoice, setShowNewInvoice] = useState(false);

  const filteredInvoices = useMemo(
    () => invoices.filter((invoice) => filter === 'All' || invoice.status === filter),
    [filter]
  );

  const columns = [
    { label: 'Invoice', key: 'id' },
    { label: 'Guest', key: 'guest' },
    { label: 'Amount', key: 'amount' },
    { label: 'Status', render: (row) => <StatusPill status={row.status} /> },
    { label: 'Due', key: 'due' },
    {
      label: 'Action',
      render: (row) => (
        <button
          type="button"
          className="table-action"
          onClick={() => {
            setSelectedInvoice(row.id);
            setNotice(`Selected ${row.id} for review.`);
          }}
        >
          Review
        </button>
      ),
    },
  ];

  return (
    <div>
      <section className="dashboard-header">
        <div>
          <h1>Billing</h1>
          <p>Track invoices, due balances, and status changes for every guest billing flow.</p>
        </div>
        <button className="add-product" type="button" onClick={() => setShowNewInvoice((value) => !value)}>
          {showNewInvoice ? 'Close Form' : 'New Invoice'}
        </button>
      </section>

      <div className="dashboard-notice">{notice}</div>

      {showNewInvoice && (
        <DashboardPanel
          title="Create a New Invoice"
          description="Fill in a quick invoice entry and send it to the guest billing queue."
        >
          <form
            className="dashboard-form-grid"
            onSubmit={(event) => {
              event.preventDefault();
              setShowNewInvoice(false);
              setNotice('New invoice draft created and queued.');
            }}
          >
            <label className="form-field">
              <span>Guest Name</span>
              <input placeholder="Guest name" required />
            </label>
            <label className="form-field">
              <span>Invoice Amount</span>
              <input placeholder="$0.00" required />
            </label>
            <label className="form-field">
              <span>Service</span>
              <input placeholder="Room service, spa, etc." required />
            </label>
            <label className="form-field">
              <span>Due Date</span>
              <input type="date" required />
            </label>
            <button className="primary-button" type="submit">Save Invoice</button>
          </form>
        </DashboardPanel>
      )}

      <DashboardPanel
        title="Invoice Summary"
        description="Filter and view outstanding invoices for the current reporting period."
        action={(
          <div className="mini-filter-group">
            {['All', 'Paid', 'Pending'].map((option) => (
              <button
                key={option}
                type="button"
                className={`filter-pill${filter === option ? ' active' : ''}`}
                onClick={() => setFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      >
        <DashboardTable
          title="Invoice List"
          columns={columns}
          rows={filteredInvoices}
          emptyText="No invoices match your filter."
        />
      </DashboardPanel>
    </div>
  );
}
