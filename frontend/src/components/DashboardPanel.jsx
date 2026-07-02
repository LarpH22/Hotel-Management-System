export default function DashboardPanel({ title, description, children, action }) {
  return (
    <section className="dashboard-panel-wrapper">
      <div className="dashboard-panel-header">
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {action ? <div className="dashboard-panel-action">{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
