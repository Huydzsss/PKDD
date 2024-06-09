import React, { useState } from 'react';
import axios from 'axios';
import './Login_Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '../Home/Menu';
import Footer from '../Home/Footer';
import { NavLink } from 'react-router-dom';

export default function Login_Register() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });
  const [errors, setErrors] = useState({});

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateRes = () => {
    let tempErrors = {};
    if (!formData.username.trim()) tempErrors.username = 'Username is required.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is not valid.';
    }
    if (!formData.password.trim()) {
      tempErrors.password = 'Password is required.';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(formData.password)) {
      tempErrors.password = 'Password is not valid.';
    }
    if (!formData.confirm_password.trim()) {
      tempErrors.confirm_password = 'Confirm password is required.';
    } else if (formData.confirm_password !== formData.password) {
      tempErrors.confirm_password = 'Confirm password must match password.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validateLogin = () => {
    let tempErrors = {};
    if (!formData.username.trim()) tempErrors.username = 'Username is required.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is not valid.';
    }
    if (!formData.password.trim()) {
      tempErrors.password = 'Password is required.';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateRes()) {
      axios.post('http://localhost:3010/products/customers', {
        action: 'register',
        ...formData
      })
        .then(response => {
          toast.success('Register successful', { autoClose: 2000 });
          setFormData({
            username: '',
            email: '',
            password: '',
            confirm_password: ''
          });
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          toast.error('Register failed', { autoClose: 2000 });
        });
    }
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      console.log('formData:', formData);
      axios.post('http://localhost:3010/products/customers', {
        action: 'login',
        ...formData
      })
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            toast.success("Login successful", { autoClose: 2000 });
            localStorage.setItem('username', formData.username);
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '/My_account';
          } else {
            toast.error("Login failed", { autoClose: 2000 });
          }
        })
        .catch(error => {
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            toast.error(`Login failed: ${error.response.data.message}`, { autoClose: 2000 });
          } else if (error.request) {
            console.error('Request data:', error.request);
            toast.error('Login failed: No response from server', { autoClose: 2000 });
          } else {
            console.error('Error message:', error.message);
            toast.error(`Login failed: ${error.message}`, { autoClose: 2000 });
          }
        });
    }
  };

  return (
    <div className='img_back'>
      <Menu />
      <nav className="bg-light py-3" aria-label="breadcrumb">
        <div className="container">
          <ol className="breadcrumb breadcrump-light d-flex justify-content-center m-0">
            <li className="breadcrumb-item small">
              <NavLink className="text-dark" to="/"><i className="bi bi-house-door"> </i>Home</NavLink>
            </li>
            <li className="breadcrumb-item small active" aria-current="page">Login</li>
          </ol>
        </div>
      </nav>
      <div className={`cont ${isSignUp ? 's--signup' : ''}`}>
        <div className="form sign-in">
          <h2>Welcome</h2>
          <label>
            <span>Username</span>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            {errors.username && <p className="error">{errors.username}</p>}
          </label>
          <label>
            <span>Email</span>
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="error">{errors.password}</p>}
          </label>
          <button type="button" className="submit" onClick={handleSubmitLogin}>Sign In</button>
        </div>
        <div className="sub-cont">
          <div className="img">
            <div className="img__text m--up">
              <h3>Don't have an account? Please Sign up!</h3>
            </div>
            <div className="img__text m--in">
              <h3>If you already have an account, just sign in.</h3>
            </div>
            <div className="img__btn" onClick={toggleSignUp}>
              <span className="m--up">Sign Up</span>
              <span className="m--in">Sign In</span>
            </div>
          </div>
          <div className="form sign-up">
            <h2>Create your Account</h2>
            <label>
              <span>Username</span>
              <input type="text" name="username" value={formData.username} onChange={handleChange} />
              {errors.username && <p className="error">{errors.username}</p>}
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
              {errors.email && <p className="error">{errors.email}</p>}
            </label>
            <label>
              <span>Password</span>
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
              {errors.password && <p className="error">{errors.password}</p>}
            </label>
            <label>
              <span>Confirm Password</span>
              <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
              {errors.confirm_password && <p className="error">{errors.confirm_password}</p>}
            </label>
            <button type="button" className="submit" onClick={handleSubmit}>Sign Up</button>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
