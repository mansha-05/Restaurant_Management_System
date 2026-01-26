import React, {useState} from "react";
import "./Login.css";
import {toast} from 'react-toastify'
import {login} from '../../services/users' 
import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../providers/AuthProvider'

function Login() {
  // add the state members for inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // get the user from AuthContext
  const {setUser} = useAuth()

  // get navigate function reference
  const navigate = useNavigate()

  //click event handler of login button
  const onLogin = async () => {
    if(email.length == 0) {
      toast.warning('please enter email')
    } else if(password.length == 0) {
      toast.warning('please enter password')
    } else {
      const response = await login(email, password)
      if(response['status'] == 'success') {
        toast.success('login successful')
        // get the token from response and cache it in local storage
        localStorage.setItem('token', response['data']['token'])

        // set the logged in user information
        setUser({
          userId: response['data']['userId'],
          email: response['data']['email']
        })
        console.log("User set in context:", {
  userId: response.data.userId,
  email: response.data.email
});
        //navigate to the home page
        navigate('/home')
      }else {
        toast.error(response['error'])
      }
    }
  }

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
          <input onChange={(e) => {setEmail(e.target.value)}} type="email" placeholder="Enter your email" />
        </div>

        {/* Password */}
        <label>Password</label>
        <div className="input-box">
          <i className="fa-solid fa-lock"></i>
          <input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Enter your password" />
          <i className="fa-regular fa-eye"></i>
        </div>

        <div className="forgot-text">Forgot Password?</div>

        {/* Login Button */}
        <button type="submit" onClick={onLogin} className="login-btn">Sign In</button>

        <div className="separator">or</div>

        {/* Google Login */}
        <button className="google-btn">
          <i className="fa-brands fa-google"></i> Continue with Google
        </button>

        <p className="signup-text">
          Don't have an account? <Link to='/home/register'><span>Sign up</span></Link>
        </p>
      </div>

      <footer>© 2025 Restaurant Management System. All rights reserved.</footer>

    </div>
  )
}

export default Login
