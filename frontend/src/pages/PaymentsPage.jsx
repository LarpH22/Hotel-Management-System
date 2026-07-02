import { useMemo, useState } from 'react';
import DashboardPanel from '../components/DashboardPanel';
import DashboardTable from '../components/DashboardTable';

const payments = [
  { id: 'PAY-301', guest: 'Deluxe Suite', amount: '$1,450', method: 'Credit Card', status: 'Completed' },
  { id: 'PAY-302', guest: 'Spa Package', amount: '$560', method: 'Bank Transfer', status: 'Pending' },
  { id: 'PAY-303', guest: 'Dining Event', amount: '$780', method: 'Cash', status: 'Completed' },
  { id: 'PAY-304', guest: 'Conference Hall', amount: '$2,300', method: 'Credit Card', status: 'Pending' },
];

function StatusPill({ status }) {
  return <span className={`status-pill ${status.toLowerCase()}`}>{status}</span>;
}

export default function PaymentsPage() {
  const [filter, setFilter] = useState('All');
  const [notice, setNotice] = useState('Review payments and reconcile records for hotel services.');
  const [showForm, setShowForm] = useState(false);

  const filteredPayments = useMemo(
    () => payments.filter((payment) => filter === 'All' || payment.status === filter),
    [filter]
  );

  const columns = [
    { label: 'Payment', key: 'id' },
    { label: 'Guest', key: 'guest' },
    { label: 'Amount', key: 'amount' },
    { label: 'Method', key: 'method' },
    { label: 'Status', render: (row) => <StatusPill status={row.status} /> },
    {
      label: 'Action',
      render: (row) => (
        <button
          type="button"
          className="table-action"
          onClick={() => setNotice(`Viewing payment ${row.id}.`)}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div>
      <section className="dashboard-header">
        <div>
          <h1>Payments</h1>
          <p>Record, track, and reconcile guest payments with ease.</p>
        </div>
        <button className="add-product" type="button" onClick={() => setShowForm((value) => !value)}>
          {showForm ? 'Cancel' : 'Record Payment'}
        </button>
      </section>

      <div className="dashboard-notice">{notice}</div>

      {showForm && (
        <DashboardPanel
          title="Record New Payment"
          description="Capture a payment and link it to the correct invoice immediately."
        >
          <form
            className="dashboard-form-grid"
            onSubmit={(event) => {
              event.preventDefault();
              setShowForm(false);
              setNotice('New payment recorded and posted to the ledger.');
            }}
          >
            <label className="form-field">
              <span>Invoice ID</span>
              <input placeholder="INV-10222" required />
            </label>
            <label className="form-field">
              <span>Amount</span>
              <input placeholder="$0.00" required />
            </label>
            <label className="form-field">
              <span>Payment Method</span>
              <select defaultValue="Credit Card">
                <option>Credit Card</option>
                <option>Bank Transfer</option>
                <option>Cash</option>
              </select>
            </label>
            <label className="form-field">
              <span>Reference</span>
              <input placeholder="Receipt number" required />
            </label>
            <button className="primary-button" type="submit">Post Payment</button>
          </form>
        </DashboardPanel>
      )}

      <DashboardPanel
        title="Payment History"
        description="Filter the ledger by payment status and review recent activity."
        action={(
          <div className="mini-filter-group">
            {['All', 'Completed', 'Pending'].map((option) => (
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
          title="Recent Payments"
          columns={columns}
          rows={filteredPayments}
          emptyText="No payments found for this filter."
        />
      </DashboardPanel>
    </div>
  );
}
