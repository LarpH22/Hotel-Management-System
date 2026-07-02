export default function DashboardTable({ title, columns, rows, actions, emptyText }) {
  return (
    <div className="dashboard-panel">
      <div className="panel-row">
        <h3>{title}</h3>
        {actions ? <div className="panel-actions">{actions}</div> : null}
      </div>
      {rows.length > 0 ? (
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                {columns.map(({ label }) => (
                  <th key={label}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id || row.reference || row.invoice || row.key || index}>
                  {columns.map(({ key, render }, columnIndex) => (
                    <td key={key || columnIndex}>
                      {render ? render(row) : row[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="panel-empty">{emptyText || 'No records found.'}</p>
      )}
    </div>
  );
}
