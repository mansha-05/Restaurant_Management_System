import React, { useEffect, useState } from "react";
import axios from "axios";
import StaffModal from "../../../components/StaffModal/StaffModal";
import "./StaffManagement.css";

const Staff = () => {

  const [staffList, setStaffList] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // =========================
  // GET ALL STAFF
  // =========================
  const fetchStaff = async () => {
    try {
      const res = await axios.get("http://localhost:8080/staff/all");
      setStaffList(res.data);
    } catch (err) {
      console.log("Fetch failed", err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // =========================
  // ADD STAFF
  // =========================
  const addStaff = async (data) => {
    try {
      await axios.post("http://localhost:8080/staff/add", data);
      fetchStaff();
    } catch (err) {
      console.log("Add failed", err);
    }
  };

  // =========================
  // UPDATE STAFF
  // =========================
  const updateStaff = async (data) => {
    try {
      await axios.put(
        `http://localhost:8080/staff/update/${editingStaff.id}`,
        data
      );
      fetchStaff();
    } catch (err) {
      console.log("Update failed", err);
    }
  };

  // =========================
  // DELETE STAFF
  // =========================
  const deleteStaff = async (id) => {
    if (!window.confirm("Delete staff member?")) return;

    try {
      await axios.delete(
        `http://localhost:8080/staff/delete/${id}`
      );
      fetchStaff();
    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  // =========================
  // SAVE FROM MODAL
  // =========================
  const handleSave = (data) => {
    if (editingStaff) {
      updateStaff(data);
    } else {
      addStaff(data);
    }

    setShowModal(false);
    setEditingStaff(null);
  };

  return (
    <div className="staff-container">

      <button
        onClick={() => {
          setEditingStaff(null);
          setShowModal(true);
        }}
      >
        Add Staff Member
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {staffList.map((staff) => (
            <tr key={staff.id}>
              <td>{staff.name}</td>
              <td>{staff.role}</td>
              <td>{staff.email}</td>
              <td>{staff.contactNo}</td>
              <td>{staff.salary}</td>

              <td>
                <button
                  onClick={() => {
                    setEditingStaff(staff);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>

                <button
                  style={{ marginLeft: "8px", background: "#dc3545" }}
                  onClick={() => deleteStaff(staff.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <StaffModal
          editingStaff={editingStaff}
          onSave={handleSave}
          closeModal={() => {
            setShowModal(false);
            setEditingStaff(null);
          }}
        />
      )}

    </div>
  );
};

export default Staff;
