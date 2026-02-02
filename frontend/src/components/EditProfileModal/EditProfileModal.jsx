import { useState } from "react";
import { updateUserProfile } from "../../services/users";
import "./EditProfileModal.css";

function EditProfileModal({ user, setUser, userId, onClose }) {

  const [form, setForm] = useState(user);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const updated = await updateUserProfile(userId, form);

      setUser(updated); // update Profile.jsx state
      onClose();

    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-card">

        <h4>Edit Profile</h4>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Name"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Email"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Phone"
        />

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          className="form-control mb-3"
          placeholder="City"
        />

        <div className="d-flex gap-2">
          <button
            className="btn btn-dark w-100"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            className="btn btn-outline-secondary w-100"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditProfileModal;