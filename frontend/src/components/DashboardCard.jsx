export default function DashboardCard({ title, children, actions }) {
  return (
    <article className="dashboard-panel">
      <div className="panel-row">
        <h3>{title}</h3>
        {actions ? <div className="panel-actions">{actions}</div> : null}
      </div>
      {children}
    </article>
  );
}
