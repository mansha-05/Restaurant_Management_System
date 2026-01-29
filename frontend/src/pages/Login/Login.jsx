import React, { useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import { login } from "../../services/users";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location=useLocation();
  const redirectTo=location.state?.redirectTo||"/home";
  // const passwordRegex = /((?=.\d)(?=.[a-z]).{5,20})/;

  const onLogin = async () => {
    const newErrors = {};

    // ===== Required checks =====
    if (email.length === 0) {
      newErrors.email = "Email is required";
      toast.warning("please enter email");
      setErrors(newErrors);
      return;
    }

    if (password.length === 0) {
      newErrors.password = "Password is required";
      toast.warning("please enter password");
      setErrors(newErrors);
      return;
    }

    // ===== Format validations =====
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
      toast.warning("Invalid email format");
    }

    // if (!passwordRegex.test(password)) {
    //   newErrors.password =
    //     "Password must be 5–20 chars, include 1 digit & 1 lowercase letter";
    //   toast.warning(
    //     "Password must contain 1 digit and 1 lowercase letter (5–20 chars)"
    //   );
    // }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // ===== API call =====
    const response = await login(email, password);

    if (response["status"] === "success") {
      toast.success("login successful");

      localStorage.setItem("token", response["data"]["token"]);

      setUser({
        userId: response["data"]["userId"],
        email: response["data"]["email"],
      });

      console.log("User set in context:", {
        userId: response.data.userId,
        email: response.data.email,
      });

      navigate(redirectTo);
    } else {
      toast.error(response["error"]);
    }
  };

  const showError = (field) =>
    errors[field] && <div className="error-text">{errors[field]}</div>;

  const inputClass = (field) => (errors[field] ? "input-error" : "");

  return (
    <div className="login-container">
      <div className="login-top">
        <div className="login-icon">
          <i className="fa-solid fa-utensils"></i>
        </div>
        <h1>Welcome Back</h1>
        <p>Sign in to your account to continue</p>
      </div>

      <div className="login-card">
        <h2>Login</h2>
        <p className="subtitle">Enter your credentials to access your account</p>

        {/* Email */}
        <label>Email</label>
        <div className="input-box">
          <i className="fa-regular fa-envelope"></i>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className={inputClass("email")}
          />
        </div>
        {showError("email")}

        {/* Password */}
        <label>Password</label>
        <div className="input-box">
          <i className="fa-solid fa-lock"></i>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className={inputClass("password")}
          />
          <i className="fa-regular fa-eye"></i>
        </div>
        {showError("password")}

        <div className="forgot-text">Forgot Password?</div>

        <button type="submit" onClick={onLogin} className="login-btn">
          Sign In
        </button>

        <div className="separator">or</div>

        <button className="google-btn">
          <i className="fa-brands fa-google"></i> Continue with Google
        </button>

        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/home/register">
            <span>Sign up</span>
          </Link>
        </p>
      </div>

      <footer>© 2025 Restaurant Management System. All rights reserved.</footer>
    </div>
  );
}

export default Login;