import { useMemo, useState } from 'react';
import DashboardPanel from '../components/DashboardPanel';
import DashboardTable from '../components/DashboardTable';

const receivables = [
  { id: 'REC-4001', guest: 'Deluxe Suite', amount: '$650', overdue: '30 days', status: 'Late' },
  { id: 'REC-4002', guest: 'Conference Hall', amount: '$1,150', overdue: '14 days', status: 'Urgent' },
  { id: 'REC-4003', guest: 'Spa Package', amount: '$210', overdue: '7 days', status: 'Due Soon' },
  { id: 'REC-4004', guest: 'Room Service', amount: '$120', overdue: 'Due now', status: 'Due' },
];

function StatusPill({ status }) {
  return <span className={`status-pill ${status.toLowerCase().replace(/\s/g, '-')}`}>{status}</span>;
}

export default function ReceivablesPage() {
  const [notice, setNotice] = useState('View guest receivables and send follow-up notices.');
  const [filter, setFilter] = useState('All');

  const filteredReceivables = useMemo(
    () => receivables.filter((item) => filter === 'All' || item.status === filter),
    [filter]
  );

  const columns = [
    { label: 'Reference', key: 'id' },
    { label: 'Guest', key: 'guest' },
    { label: 'Due Amount', key: 'amount' },
    { label: 'Overdue', key: 'overdue' },
    { label: 'Priority', render: (row) => <StatusPill status={row.status} /> },
    {
      label: 'Action',
      render: (row) => (
        <button
          type="button"
          className="table-action"
          onClick={() => setNotice(`Notice sent for ${row.id}.`)}
        >
          Send Notice
        </button>
      ),
    },
  ];

  return (
    <div>
      <section className="dashboard-header">
        <div>
          <h1>Receivables</h1>
          <p>Keep billing healthy by following up on invoices that need action. </p>
        </div>
        <button className="add-product" type="button" onClick={() => setNotice('A follow-up notice has been issued.')}>Send Notice</button>
      </section>

      <div className="dashboard-notice">{notice}</div>

      <DashboardPanel
        title="Outstanding Receivables"
        description="Filter and manage receivable priority levels."
        action={(
          <div className="mini-filter-group">
            {['All', 'Urgent', 'Late', 'Due Soon', 'Due'].map((option) => (
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
          title="Receivables Ledger"
          columns={columns}
          rows={filteredReceivables}
          emptyText="No receivables match your selected priority."
        />
      </DashboardPanel>
    </div>
  );
}
