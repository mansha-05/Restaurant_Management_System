import "./AddManagerModal.css";
import { useState } from "react";

export default function AddManagerModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Valid email required";
    if (!/^[6-9]\d{9}$/.test(form.phone))
      newErrors.phone = "Enter valid 10-digit phone";
    if (form.password.length < 6)
      newErrors.password = "Minimum 6 characters required";
    if (!form.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave(form);
    onClose();
  };

  return (
    <div className="amm-overlay">
      <div className="amm-modal">
        <div className="amm-header">
          <h2>Add New Manager</h2>
          <button className="amm-close" onClick={onClose}>×</button>
        </div>

        <p className="amm-subtitle">Add a new manager to your system</p>

        <form className="amm-form" onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <span className="amm-error">{errors.name}</span>}

          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />
          {errors.email && <span className="amm-error">{errors.email}</span>}

          <label>Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <span className="amm-error">{errors.phone}</span>}

          <label>Password</label>
          <div className="amm-password-box">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="amm-show-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <span className="amm-error">{errors.password}</span>}

          <label>City</label>
          <input name="city" value={form.city} onChange={handleChange} />
          {errors.city && <span className="amm-error">{errors.city}</span>}

          <button type="submit" className="amm-submit">Add Manager</button>
        </form>
      </div>
    </div>
  );
}
