import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/users";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");

  const [errors, setErrors] = useState({});
  const passwordRegex = /((?=.*\d)(?=.*[a-z]).{5,20})/;

  const navigate = useNavigate();

  const onRegister = async () => {
    const newErrors = {};

    // ===== Required field checks (toast + inline) =====
    if (!name.trim()) {
      newErrors.name = "Name is required";
      toast.warning("Please enter Name");
      setErrors(newErrors);
      return;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      toast.warning("Please enter Email");
      setErrors(newErrors);
      return;
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
      toast.warning("Please enter phone number");
      setErrors(newErrors);
      return;
    }

    if (!password) {
      newErrors.password = "Password is required";
      toast.warning("Please enter password");
      setErrors(newErrors);
      return;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
      toast.warning("Please confirm password");
      setErrors(newErrors);
      return;
    }

    if (!city.trim()) {
      newErrors.city = "City is required";
      toast.warning("Please enter city");
      setErrors(newErrors);
      return;
    }

    // ===== Format validations =====
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
      toast.warning("Invalid email format");
    }

    if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter valid 10 digit phone number";
      toast.warning("Invalid phone number");
    }

    if (!passwordRegex.test(password)) {
          newErrors.password =
            "Password must be 5–20 chars, include 1 digit & 1 lowercase letter";
          toast.warning(
            "Password must contain 1 digit and 1 lowercase letter (5–20 chars)"
          );
        }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      toast.warning("Password does not match");
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // ===== API call =====
    try {
      const response = await register(name, email, phone, password, city);

      if (response.status === "success") {
        toast.success(response.message);
        navigate("/home/login");
      } else {
        toast.error(response.error || "Registration failed");
      }
    } catch {
      toast.error("Server error. Try again later.");
    }
  };

  const showError = (field) =>
    errors[field] && <div className="error-text">{errors[field]}</div>;

  const inputClass = (field) => (errors[field] ? "input-error" : "");

  return (
    <div className="register-container">
      <div className="top-icon">
        <i className="fa-solid fa-utensils"></i>
      </div>

      <h1 className="title">Create Account</h1>
      <p className="subtitle">Join us for an amazing dining experience</p>

      <div className="register-card">
        <h2 className="form-title">Sign Up</h2>
        <p className="form-subtitle">Fill in your details to create a new account</p>

        <form>
          <div className="row">
            <div className="form-group">
              <label>Name</label>
              <div className="input-box">
                <i className="fa-regular fa-user"></i>
                <input
                  type="text"
                  className={inputClass("name")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {showError("name")}
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="input-box">
                <i className="fa-regular fa-envelope"></i>
                <input
                  type="email"
                  className={inputClass("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {showError("email")}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <div className="input-box">
                <i className="fa-solid fa-phone"></i>
                <input
                  type="text"
                  className={inputClass("phone")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              {showError("phone")}
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-box">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  className={inputClass("password")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {showError("password")}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-box">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  className={inputClass("confirmPassword")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {showError("confirmPassword")}
            </div>

            <div className="form-group">
              <label>City</label>
              <div className="input-box">
                <i className="fa-solid fa-house"></i>
                <input
                  type="text"
                  className={inputClass("city")}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              {showError("city")}
            </div>
          </div>

          <button type="button" onClick={onRegister} className="btn-create">
            Create Account
          </button>

          <p className="login-link">
            Already have an account?{" "}
            <Link to="/home/login">
              <span>Sign in</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;