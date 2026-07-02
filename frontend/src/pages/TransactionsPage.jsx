import { useMemo, useState } from 'react';
import DashboardPanel from '../components/DashboardPanel';
import DashboardTable from '../components/DashboardTable';

const transactions = [
  { id: 'TRX-8001', reference: 'INV-10222', amount: '$1,450', status: 'Completed', type: 'Invoice' },
  { id: 'TRX-8002', reference: 'INV-10223', amount: '$560', status: 'Pending', type: 'Invoice' },
  { id: 'TRX-8003', reference: 'INV-10224', amount: '$780', status: 'Completed', type: 'Service' },
  { id: 'TRX-8004', reference: 'INV-10225', amount: '$2,300', status: 'Pending', type: 'Event' },
];

function StatusPill({ status }) {
  return <span className={`status-pill ${status.toLowerCase()}`}>{status}</span>;
}

export default function TransactionsPage() {
  const [notice, setNotice] = useState('Review financial flow, payments, and invoice settlement across the hotel.');
  const [filter, setFilter] = useState('All');

  const filteredTransactions = useMemo(
    () => transactions.filter((transaction) => filter === 'All' || transaction.status === filter),
    [filter]
  );

  const columns = [
    { label: 'Transaction', key: 'id' },
    { label: 'Type', key: 'type' },
    { label: 'Reference', key: 'reference' },
    { label: 'Amount', key: 'amount' },
    { label: 'Status', render: (row) => <StatusPill status={row.status} /> },
    {
      label: 'Action',
      render: (row) => (
        <button
          type="button"
          className="table-action"
          onClick={() => setNotice(`Opened transaction ${row.id}.`)}
        >
          Details
        </button>
      ),
    },
  ];

  return (
    <div>
      <section className="dashboard-header">
        <div>
          <h1>Transactions</h1>
          <p>Monitor transactional activity and confirm posted revenue from guest services.</p>
        </div>
        <button className="add-product" type="button" onClick={() => setNotice('Transaction export generated.')}>Export</button>
      </section>

      <div className="dashboard-notice">{notice}</div>

      <DashboardPanel
        title="Transaction Ledger"
        description="Filter transactions by status and explore payment details."
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
          title="Recent Transactions"
          columns={columns}
          rows={filteredTransactions}
          emptyText="No transactions found for this filter."
        />
      </DashboardPanel>
    </div>
  );
}
