import React, { useState } from "react";
import { useTables } from "../../hooks/useTables";
import TableStats from "./TableStats";
import TableCard from "./TableCard";
import EditTableModal from "./EditTableModal";
import { FiPlus } from "react-icons/fi";
import "./TableManagement.css";

const TableManagement = () => {
  const { tables, loading, addTable, updateTable, updateTableStatus, deleteTable } = useTables();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState(null);

  if (loading) return <div className="table-mgmt-container"><p>Loading tables...</p></div>;

  // Group tables by status
  const groupedTables = tables.reduce((acc, table) => {
    const statusLabel = table.status?.toLowerCase() === 'out_of_service' ? 'Out of Service' : 'Available';
    if (!acc[statusLabel]) acc[statusLabel] = [];
    acc[statusLabel].push(table);
    return acc;
  }, {});

  const handleAddClick = () => {
    setEditingTable(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (table) => {
    setEditingTable({
      id: table.tableId,
      number: table.table_no,
      capacity: table.capacity,
      // location: table.location,
      status: table.status?.toLowerCase()
    });
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    if (editingTable) {
      await updateTable(editingTable.id, {
        table_no: formData.number,
        capacity: formData.capacity,
        status: (formData.status || "available").toUpperCase(),
        location: editingTable.location // Preserve existing location
      });
    } else {
      await addTable({
        table_no: formData.number,
        capacity: formData.capacity,
        // location: "General", // Default location
        status: "AVAILABLE" // Default status
      });
    }
  };

  return (
    <div className="table-mgmt-container">
      <header className="mgmt-header">
        <div className="header-left">
          <h1>Table Management</h1>
          <p>Configure and manage restaurant tables</p>
        </div>
        <button className="btn-add-table" onClick={handleAddClick}>
          <FiPlus size={20} />
          Add New Table
        </button>
      </header>

      <TableStats tables={tables} />

      {Object.entries(groupedTables).map(([location, locationTables]) => (
        <section key={location} className="table-section">
          <h2 className="section-title">{location} - {locationTables.length} tables</h2>
          <div className="table-grid">
            {locationTables.map((table) => (
              <TableCard
                key={table.tableId}
                table={table}
                onEdit={() => handleEditClick(table)}
                onDelete={() => deleteTable(table.tableId)}
              />
            ))}
          </div>
        </section>
      ))}

      <EditTableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingTable}
      />
    </div>
  );
};

export default TableManagement;
