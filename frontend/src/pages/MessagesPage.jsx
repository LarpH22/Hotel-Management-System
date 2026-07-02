import { useState } from 'react';
import DashboardPanel from '../components/DashboardPanel';

const messages = [
  { id: 'MSG-101', subject: 'Invoice reminder for Deluxe Suite', status: 'Unread', date: 'Jul 11 2024', preview: 'Please settle your invoice before departure.' },
  { id: 'MSG-102', subject: 'Payment confirmation from Spa Package', status: 'Read', date: 'Jul 12 2024', preview: 'Your payment has been processed successfully.' },
  { id: 'MSG-103', subject: 'Billing notice for Conference Hall', status: 'Unread', date: 'Jul 10 2024', preview: 'A balance remains for your recent event booking.' },
];

function StatusPill({ status }) {
  return <span className={`status-pill ${status.toLowerCase()}`}>{status}</span>;
}

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  const [showCompose, setShowCompose] = useState(false);
  const [notice, setNotice] = useState('Stay on top of billing communications and guest alerts.');

  return (
    <div>
      <section className="dashboard-header">
        <div>
          <h1>Messages</h1>
          <p>View notifications, invoice alerts, and communication history for guests.</p>
        </div>
        <button className="add-product" type="button" onClick={() => setShowCompose((value) => !value)}>
          {showCompose ? 'Close' : 'Compose Message'}
        </button>
      </section>

      <div className="dashboard-notice">{notice}</div>

      {showCompose && (
        <DashboardPanel title="Compose Billing Message" description="Send a note to a guest or internal finance team member.">
          <form
            className="dashboard-form-grid"
            onSubmit={(event) => {
              event.preventDefault();
              setShowCompose(false);
              setNotice('Message queued for delivery.');
            }}
          >
            <label className="form-field">
              <span>Recipient</span>
              <input placeholder="Guest or team member" required />
            </label>
            <label className="form-field">
              <span>Subject</span>
              <input placeholder="Message subject" required />
            </label>
            <label className="form-field full-width">
              <span>Message</span>
              <textarea rows="4" placeholder="Write your message" required />
            </label>
            <button className="primary-button" type="submit">Send Message</button>
          </form>
        </DashboardPanel>
      )}

      <div className="split-grid">
        <DashboardPanel title="Inbox" description="Select a message to read details.">
          <div className="message-list">
            {messages.map((message) => (
              <button
                key={message.id}
                type="button"
                className={`message-item${selectedMessage.id === message.id ? ' active' : ''}`}
                onClick={() => {
                  setSelectedMessage(message);
                  setNotice(`Opened ${message.subject}.`);
                }}
              >
                <div>
                  <strong>{message.subject}</strong>
                  <small>{message.preview}</small>
                </div>
                <div>
                  <StatusPill status={message.status} />
                  <small>{message.date}</small>
                </div>
              </button>
            ))}
          </div>
        </DashboardPanel>

        <DashboardPanel title="Message Preview" description="Read the selected billing communication.">
          <div className="message-detail">
            <h3>{selectedMessage.subject}</h3>
            <p className="message-meta">{selectedMessage.date} · {selectedMessage.status}</p>
            <p>{selectedMessage.preview} Full message preview appears here for easy follow-up and reference.</p>
          </div>
        </DashboardPanel>
      </div>
    </div>
  );
}
