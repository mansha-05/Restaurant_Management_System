// export default function TableStats({ tables }) {
//   const total = tables.length;
//   const available = tables.filter(t => t.status === "AVAILABLE").length;
//   const occupied = tables.filter(t => t.status === "OCCUPIED").length;

//   return (
//     <div className="stats-row">
//       <StatCard title="Total Tables" value={total} />
//       <StatCard title="Available" value={available} green />
//       <StatCard title="Occupied" value={occupied} red />
//     </div>
//   );
// }

// function StatCard({ title, value, green, red }) {
//   return (
//     <div className={`stat-card ${green ? "green" : ""} ${red ? "red" : ""}`}>
//       <p>{title}</p>
//       <h3>{value}</h3>
//     </div>
//   );
// }
import React from 'react';

const TableStats = ({ tables }) => {
  const total = tables.length;
  const available = tables.filter(t => t.status?.toLowerCase() === 'available').length;
  const outOfService = tables.filter(t => t.status?.toLowerCase() === 'out_of_service').length;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <span className="stat-label">Total Tables</span>
        <h2 className="stat-value">{total}</h2>
      </div>
      <div className="stat-card">
        <span className="stat-label">Available</span>
        <h2 className="stat-value" style={{ color: 'var(--available-text)' }}>{available}</h2>
      </div>
      <div className="stat-card">
        <span className="stat-label">Out of Service</span>
        <h2 className="stat-value" style={{ color: 'var(--occupied-text)' }}>{outOfService}</h2>
      </div>
    </div>
  );
};

export default TableStats;