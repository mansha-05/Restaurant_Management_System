import React, {useState} from "react";
import "./Register.css";
import {Link, useNavigate} from 'react-router-dom'
import {register} from '../../services/users'
import {toast} from 'react-toastify'

const Register = () => {
  //state members for setting user inputs
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [city, setCity] = useState('')

  // get navigate function reference
  const navigate = useNavigate()

  const onRegister = async () =>{
    if(name.length == 0){
      toast.warning('Please enter Name')
    } else if(email.length == 0) {
      toast.warning('Please enter Email')
    } else if(phone.length == 0) {
      toast.warning('Please enter phone number')
    } else if (password.length == 0) {
      toast.warning('Please enter password')
    } else if (confirmPassword.length == 0) {
      toast.warning('Please confirm password')
    } else if(city.length == 0) {
      toast.warning('Please enter city')
    } else if (password != confirmPassword) {
      toast.warning('Password does not match')
    } else {
      const response = await register(name, email, phone, password, city)
      if(response['status'] === 'success') {
        toast.success(response['message'])
        navigate('/home/login')
      }else{
        toast.error(response['error'])
      }
    }
  }
 
  return (
    <div className="register-container">

      {/* Top Icon */}
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
                 onChange={(e) => setName(e.target.value)}
                 type="text" placeholder="John" />
              </div>
            </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-box">
              <i className="fa-regular fa-envelope"></i>
              <input
               onChange={(e) => setEmail(e.target.value)}
               type="email" placeholder="john.doe@example.com" />
            </div>
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <div className="input-box">
              <i className="fa-solid fa-phone"></i>
              <input
               onChange={(e) => setPhone(e.target.value)}
               type="text" placeholder="123-456-7890" />
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>Password</label>
              <div className="input-box">
                <i className="fa-solid fa-lock"></i>
                <input
                 onChange={(e) => setPassword(e.target.value)}
                 type="password" placeholder="Enter password" />
                <i className="fa-regular fa-eye"></i>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <div className="input-box">
                <i className="fa-solid fa-lock"></i>
                <input
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 type="password" placeholder="Confirm password" />
                <i className="fa-regular fa-eye"></i>
              </div>
            </div>
            <div className="form-group">
              <label>City</label>
              <div className="input-box">
                <i className="fa-solid fa-house"></i>
                <input
                 onChange={(e) => setCity(e.target.value)}
                 type="text" placeholder="Pune" />
              </div>
            </div>
          </div>
          </div>

          <div className="terms">
            <input type="checkbox" />
            <span>I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a></span>
          </div>

          <button type="button" onClick={() => {onRegister()}} className="btn-create">Create Account</button>

          <div className="divider">
            <span>or</span>
          </div>

          <button className="btn-google">
            <i className="fa-brands fa-google"></i> Continue with Google
          </button>

          <p className="login-link">
            Already have an account? <Link to='/home/login'><span>Sign in</span></Link>
          </p>

        </form>

      </div>
    </div>
  );
};

export default Register;
