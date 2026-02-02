import React, { useEffect, useState } from "react";
import "../../pages/Admin/StaffManagement/StaffManagement.css";
import { toast } from "react-toastify";


const token = localStorage.getItem("token")
const StaffModal = ({ editingStaff, onSave, closeModal }) => {

  // MUST be inside component
  const [roles, setRoles] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "",
    email: "",
    phone: "",
    salary: ""
  });

  // Autofill edit
  useEffect(() => {
    if (editingStaff) {
      setFormData({
        id: editingStaff.id || "",
        name: editingStaff.name || "",
        role: editingStaff.role || "",
        email: editingStaff.email || "",
        phone: editingStaff.contactNo || "",
        salary: editingStaff.salary || ""
      });
    } else {
      setFormData({
        id: "",
        name: "",
        role: "",
        email: "",
        phone: "",
        salary: ""
      });
    }
  }, [editingStaff]);


  // Fetch roles
  useEffect(() => {
    fetch(`${config.server}/staff/staff/roles`, 
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    )
      .then(res => res.json())
      .then(data => setRoles(data))
      .catch(err => console.error(err));
  }, []);

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      role: formData.role
    };

    onSave(payload);

    toast.success(
      editingStaff
        ? "Staff updated successfully! 🎉"
        : "Staff saved successfully! 🎉"
    );

    closeModal();
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <h2>
          {editingStaff ? "Edit Staff" : "Add Staff"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">

            <button type="submit">
              {editingStaff ? "Update" : "Save"}
            </button>

            <button
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default StaffModal;
