import React, { useState } from "react";
import '../style.css';
import Menu from "../Home/Menu";
import Footer from "../Home/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from "react-router-dom";



export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ' '
    });
    const [errors, setErrors] = useState({});

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
        if (!formData.confirm_password.trim()) {
            tempErrors.confirm_password = "Confirm password is required.";
        } else if (formData.confirm_password !== formData.password) {
            tempErrors.confirm_password = "Confirm password must corret password.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axios.post('http://localhost:3010/products/users', formData)
                .then(response => {
                    toast.success("Resgister successful", { autoClose: 2000 });
                    setFormData({
                        username: '',
                        email: '',
                        password: '',
                        confirm_password: ' '
                    });
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    toast.error("Resgister failed", { autoClose: 2000 });
                });
        }
    };

    return (
        <div className="py-2 top-header bg ">
            <Menu />
            <div className="text-start ">
                <div>
                    <nav className="bg-light py-3" aria-label="breadcrumb">
                        <div className="container">
                            <ol className="breadcrumb breadcrump-light d-flex justify-content-center m-0">
                                <li className="breadcrumb-item small"><a className="text-dark" href="#"><i className="bi bi-house-door"> </i>Home</a></li>
                                <li className="breadcrumb-item small active" aria-current="page">Sign Up</li>
                            </ol>
                        </div>
                    </nav>
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-6 mx-auto">
                                <div className="border shadow py-4 px-5">
                                    <h4 className="text-center"> Sign Up Matgar</h4>
                                    <div className="d-flex gap-3 align-items-center justify-content-center my-4"><a className="social-sm-icon rounded-1 shadow-sm border" href="#"><img src="https://html.hixstudio.net/shofy-prv/shofy/assets/img/icon/login/google.svg" alt /></a><a className="social-sm-icon rounded-1 shadow-sm border" href="#"><img src="https://html.hixstudio.net/shofy-prv/shofy/assets/img/icon/login/facebook.svg" alt /></a><a className="social-sm-icon rounded-1 shadow-sm border" href="#"><img src="https://html.hixstudio.net/shofy-prv/shofy/assets/img/icon/login/apple.svg" alt /></a></div>
                                    <div className="center-line text-center mx-auto mb-3"> <span className="px-2 bg-white m-0 position-relative">or Sign in with Email</span></div>
                                    <form action onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="username">Username</label>
                                            <input className="form-control rounded-0"
                                                id="username"
                                                type="text"
                                                name="username"
                                                placeholder="Johan Thmes"
                                                value={formData.username}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {errors.username && <div className="text-danger">{errors.username}</div>}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="email">Email</label>
                                            <input className="form-control rounded-0"
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="name@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            {errors.email && <div className="text-danger">{errors.email}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="password">Password</label>
                                            <input className="form-control rounded-0"
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Your Password"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                            {errors.password && <div className="text-danger">{errors.password}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="confirm_password">Confirm Password</label>
                                            <input className="form-control rounded-0"
                                                id="confirm_password"
                                                name="confirm_password"
                                                type="password"
                                                placeholder="Confirm Password"
                                                value={formData.confirm_password}
                                                onChange={handleChange}
                                            />
                                            {errors.confirm_password && <div className="text-danger">{errors.confirm_password}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <div className="form-check">
                                                <input className="rounded-0 form-check-input" id="remember-me" type="checkbox" />
                                                <label className="form-check-label text-gray small" htmlFor="remember-me">Remember Me</label>
                                            </div>
                                        </div>
                                        <div className="d-grid">
                                            <button className="btn btn-primary rounded-0" type="submit">Sign Up</button>
                                        </div>
                                    </form>
                                <NavLink to="/Login">
                                    <p className="text-gray text-center">
                                       If you have account ?<span className="ms-1 text-primary">Login that.</span>
                                    </p>
                                </NavLink>
                                </div>
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
