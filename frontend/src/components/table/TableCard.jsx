import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const TableCard = ({ table, onEdit, onDelete }) => {
  const status = table.status?.toLowerCase() || 'available';

  return (
    <div className="table-card">
      <div className="card-header">
        <h3>Table {table.table_no}</h3>
        <span className={`badge ${status}`}>
          {status}
        </span>
      </div>
      <p className="seats-text">Seats {table.capacity}</p>
      <p className="seats-text">Price {table.reservationPrice}</p>

      <div className="card-actions">
        <button className="btn-action edit" onClick={onEdit}>
          <FiEdit2 size={16} />
          Edit
        </button>
        {/* <button className="btn-action delete" onClick={onDelete}>
          <FiTrash2 size={16} />
        </button> */}
      </div>
    </div>
  );
};

export default TableCard;
