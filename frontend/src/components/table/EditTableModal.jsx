import React, { useState, useEffect } from 'react';
import './TableManagement.css';

const EditTableModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    number: '',
    capacity: '',
    status: 'available'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ number: '', capacity: '',status: 'available' });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{initialData ? 'Edit Table' : 'Add New Table'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <p className="modal-subtitle">
          {initialData ? 'Update the table details' : 'Enter the details for the new table'}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Table Number</label>
              <input
                type="text"
                name="number"
                placeholder="e.g., T-1"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                name="capacity"
                placeholder="Number of seats"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {initialData && (
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="available">Available</option>
                <option value="out_of_service">Out of Service</option>
              </select>
            </div>
          )}

          <button type="submit" className="btn-submit">
            {initialData ? 'Update Table' : 'Add Table'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTableModal;
