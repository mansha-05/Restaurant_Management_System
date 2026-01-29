import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TableManagement from '../components/table/TableManagement';
import { useTables } from "../../hooks/useTables";

const TableManagement = () => {
  const [activeTab, setActiveTab] = useState('table-management');

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar activePage={activeTab} setActivePage={setActiveTab} />

      <div
        className="main-wrapper"
        style={{
          flexGrow: 1,
          marginLeft: '260px',
          backgroundColor: '#fdfdfd'
        }}
      >
        <header
          style={{
            height: '60px',
            borderBottom: '1px solid #eee',
            display: 'flex',
            alignItems: 'center',
            padding: '0 2rem',
            backgroundColor: '#fff'
          }}
        >
          <h3 style={{ color: '#ff4d00', fontSize: '1.1rem' }}>
            Savory Restaurant
          </h3>
        </header>

        <main className="content-padding" style={{ padding: '20px' }}>
          {activeTab === 'table-management' ? (
            <TableManagement />
          ) : (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h2>{activeTab.replace('-', ' ')} Section</h2>
              <p>This module is under development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default TableManagement;
