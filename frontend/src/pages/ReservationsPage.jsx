import { useMemo, useState } from 'react';
import DashboardPanel from '../components/DashboardPanel';
import DashboardTable from '../components/DashboardTable';

const reservations = [
  { id: 'RES-2101', guest: 'Deluxe Suite', date: '2024-07-21', status: 'Confirmed', room: 'Deluxe Suite' },
  { id: 'RES-2102', guest: 'Conference Hall', date: '2024-07-22', status: 'Pending', room: 'Conference Hall' },
  { id: 'RES-2103', guest: 'Spa Package', date: '2024-07-23', status: 'Confirmed', room: 'Spa Package' },
  { id: 'RES-2104', guest: 'Room Service', date: '2024-07-24', status: 'Confirmed', room: 'Room Service' },
];

function StatusPill({ status }) {
  return <span className={`status-pill ${status.toLowerCase()}`}>{status}</span>;
}

export default function ReservationsPage() {
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState('Manage upcoming reservations and link them to billing.');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredReservations = useMemo(
    () => reservations.filter((reservation) => statusFilter === 'All' || reservation.status === statusFilter),
    [statusFilter]
  );

  const columns = [
    { label: 'Reservation', key: 'id' },
    { label: 'Guest', key: 'guest' },
    { label: 'Room', key: 'room' },
    { label: 'Date', key: 'date' },
    { label: 'Status', render: (row) => <StatusPill status={row.status} /> },
    {
      label: 'Action',
      render: (row) => (
        <button
          type="button"
          className="table-action"
          onClick={() => setNotice(`Editing reservation ${row.id}.`)}
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <div>
      <section className="dashboard-header">
        <div>
          <h1>Reservations</h1>
          <p>Coordinate bookings, room assignments, and billing status from one place.</p>
        </div>
        <button className="add-product" type="button" onClick={() => setShowForm((value) => !value)}>
          {showForm ? 'Close' : 'New Reservation'}
        </button>
      </section>

      <div className="dashboard-notice">{notice}</div>

      {showForm && (
        <DashboardPanel title="New Reservation" description="Add a reservation and assign it to the billing workflow.">
          <form
            className="dashboard-form-grid"
            onSubmit={(event) => {
              event.preventDefault();
              setShowForm(false);
              setNotice('New reservation added to the schedule.');
            }}
          >
            <label className="form-field">
              <span>Guest Name</span>
              <input placeholder="Guest name" required />
            </label>
            <label className="form-field">
              <span>Room / Service</span>
              <input placeholder="Deluxe Suite" required />
            </label>
            <label className="form-field">
              <span>Arrival Date</span>
              <input type="date" required />
            </label>
            <label className="form-field">
              <span>Status</span>
              <select defaultValue="Confirmed">
                <option>Confirmed</option>
                <option>Pending</option>
                <option>Cancelled</option>
              </select>
            </label>
            <button className="primary-button" type="submit">Save Reservation</button>
          </form>
        </DashboardPanel>
      )}

      <DashboardPanel
        title="Upcoming Reservations"
        description="Filter reservations by current status and manage the guest schedule."
        action={(
          <div className="mini-filter-group">
            {['All', 'Confirmed', 'Pending'].map((option) => (
              <button
                key={option}
                type="button"
                className={`filter-pill${statusFilter === option ? ' active' : ''}`}
                onClick={() => setStatusFilter(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      >
        <DashboardTable
          title="Reservation Schedule"
          columns={columns}
          rows={filteredReservations}
          emptyText="No reservations match this filter."
        />
      </DashboardPanel>
    </div>
  );
}
