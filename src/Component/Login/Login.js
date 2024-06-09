import React, { useState } from "react";
import '../style.css';
import Menu from "../Home/Menu";
import Footer from "../Home/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
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

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axios.post('http://localhost:3010/products/users', formData)
    .then(response => {
        toast.success("Login successful", { autoClose: 2000 });
        setFormData({
            username: '',
            email: '',
            password: ''
        });
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        toast.error("Login failed", { autoClose: 2000 });
    });
        }
    };

    return (
        <div className="py-2 top-header bg">
            <Menu />
            <div className="text-start">
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
                <div className="container py-5">
                    <div className="row">
                        <div className="col-6 mx-auto">
                            <div className="border shadow py-4 px-5">
                                <h4 className="text-center">Login to Matgar</h4>
                                <NavLink to="/Register">
                                    <p className="text-gray text-center">
                                        Don’t have an account?<span className="ms-1 text-primary">Create New Account</span>
                                    </p>
                                </NavLink>
                                <div className="d-flex gap-3 align-items-center justify-content-center my-4">
                                    <a className="social-sm-icon rounded-1 shadow-sm border" href="#"><img src="https://html.hixstudio.net/shofy-prv/shofy/assets/img/icon/login/google.svg" alt="Google" /></a>
                                    <a className="social-sm-icon rounded-1 shadow-sm border" href="#"><img src="https://html.hixstudio.net/shofy-prv/shofy/assets/img/icon/login/facebook.svg" alt="Facebook" /></a>
                                    <a className="social-sm-icon rounded-1 shadow-sm border" href="#"><img src="https://html.hixstudio.net/shofy-prv/shofy/assets/img/icon/login/apple.svg" alt="Apple" /></a>
                                </div>
                                <div className="center-line text-center mx-auto mb-3">
                                    <span className="px-2 bg-white m-0 position-relative">or Sign in with Email</span>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="username">Username</label>
                                        <input
                                            className="form-control rounded-0"
                                            id="username"
                                            type="text"
                                            name="username"
                                            placeholder="Your Username"
                                            value={formData.username}
                                            onChange={handleChange}
                                        />
                                        {errors.username && <div className="text-danger">{errors.username}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input
                                            className="form-control rounded-0"
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="name@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <div className="text-danger">{errors.email}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <input
                                            className="form-control rounded-0"
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="Your Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        {errors.password && <div className="text-danger">{errors.password}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input className="rounded-0 form-check-input" id="remember-me" type="checkbox" />
                                            <label className="form-check-label text-gray small" htmlFor="remember-me">Remember Me</label>
                                        </div>
                                    </div>
                                    <div className="d-grid">
                                        <button className="btn btn-primary rounded-0" type="submit">Log In</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
}
