import React, { useEffect, useState } from "react";
import '../style.css';
import Menu from "../Home/Menu";
import Footer from "../Home/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


export default function My_account() {
    const [username, setUsername] = useState('');
    const [customer, setCustomer] = useState({});
    const [editingField, setEditingField] = useState('');
    const [editedCustomer, setEditedCustomer] = useState({});
    const [order, setOrder] = useState([])

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);
    useEffect(() => {
        axios.get('http://localhost:3010/products/customers')
            .then(response => {
                setCustomer(response.data[0]);
                setEditedCustomer({ ...response.data[0] });
            })
            .catch(error => {
                console.error('Error fetching Customers:', error);
            });
    }, []);
    useEffect(() => {
        axios.get('http://localhost:3010/products/orders')
            .then(response => {
                setOrder(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);
    const handleEdit = (field) => {
        setEditingField(field);
    };

    const handleChange = (e) => {
        setEditedCustomer({ ...editedCustomer, [editingField]: e.target.value });
    };
    const handleSave = () => {
        axios.post('http://localhost:3010/products/customers', editedCustomer)
            .then(response => {
                console.log(response.data);
                toast.success("Account info saved successfully!");
                setCustomer({ ...editedCustomer });
            })
            .catch(error => {
                console.error('Error saving account info:', error);
                toast.error("Error saving account info!");
            });
    };
    const handleLogOut = () => {
        localStorage.removeItem('username')
    }


    return (
        <div className="py-2 top-header bg">
            <Menu />
            <div>
                <nav className="bg-light py-3 " aria-label="breadcrumb">
                    <div className="container">
                        <ol className="breadcrumb breadcrump-light d-flex justify-content-center  m-0">
                            <li className="breadcrumb-item small"><a className="text-muted" href="#">Home</a></li>
                            <li className="breadcrumb-item small active" aria-current="page">My account</li>
                        </ol>
                    </div>
                </nav>
                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <ul className="account-list nav gap-1 flex-lg-column">
                                    <li className="nav-item"> <a className="text-gray border border-silver mb-2 nav-link active" data-bs-toggle="tab" data-bs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="true"><i className="bi bi-speedometer2 me-2" />Dashboard</a></li>
                                    <li className="nav-item"> <a className="text-gray border border-silver mb-2 nav-link" data-bs-toggle="tab" data-bs-target="#orders" type="button" role="tab" aria-controls="orders" aria-selected="true"> <i className="bi bi-bag me-2" />Orders</a></li>
                                    <li className="nav-item"> <a className="text-gray border border-silver mb-2 nav-link" data-bs-toggle="tab" data-bs-target="#downloades" type="button" role="tab" aria-controls="downloades" aria-selected="true"> <i className="bi bi-download me-2" />Downloads</a></li>
                                    <li className="nav-item"> <a className="text-gray border border-silver mb-2 nav-link" data-bs-toggle="tab" data-bs-target="#addresses" type="button" role="tab" aria-controls="addresses" aria-selected="true"> <i className="bi bi-geo-alt me-2" />Addresses </a></li>
                                    <li className="nav-item"> <a className="text-gray border border-silver mb-2 nav-link" data-bs-toggle="tab" data-bs-target="#details" type="button" role="tab" aria-controls="details" aria-selected="true"> <i className="bi bi-person-vcard me-2" />Account Details </a></li>
                                    <li className="nav-item"> <a className="text-gray border border-silver mb-2 nav-link" href="Login_Register"><i className="bi bi-box-arrow-right me-2" />Logout</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-9">
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                                        <h5 className="fw-bold">Hello, <span className="text-primary">{username}</span></h5>
                                        <p className="text-gray">From your account dashboard you can view your recent <a href="#">orders</a>, <a href="#">manage your shipping and billing addresses</a>, and edit your <a href="#">password and account details.</a></p>
                                        <div className="row">
                                            <div className="col-6 col-lg-4">
                                                <div className="custom-order mt-3 py-5 border border-silver-light text-center" data-bs-target="#orders" type="button">
                                                    <div className="fs-1 text-dark"><i className="bi bi-bag" /></div>
                                                    <h6 className="text-dark mt-2 mb-0">Orders</h6>
                                                </div>
                                            </div>
                                            <div className="col-6 col-lg-4">
                                                <div className="custom-order mt-3 py-5 border border-silver-light text-center" data-bs-target="#downloades" type="button">
                                                    <div className="fs-1 text-dark"><i className="bi bi-download" /></div>
                                                    <h6 className="text-dark mt-2 mb-0">Downloads</h6>
                                                </div>
                                            </div>
                                            <div className="col-6 col-lg-4">
                                                <div className="custom-order mt-3 py-5 border border-silver-light text-center" data-bs-target="#addresses" type="button">
                                                    <div className="fs-1 text-dark"><i className="bi bi-geo-alt" /></div>
                                                    <h6 className="text-dark mt-2 mb-0">Addresses</h6>
                                                </div>
                                            </div>
                                            <div className="col-6 col-lg-4">
                                                <div className="custom-order mt-3 py-5 border border-silver-light text-center" data-bs-target="#details" type="button">
                                                    <div className="fs-1 text-dark"><i className="bi bi-person-vcard" /></div>
                                                    <h6 className="text-dark mt-2 mb-0">Account Details</h6>
                                                </div>
                                            </div>
                                            <div className="col-6 col-lg-4">
                                                <div className="mt-3 py-5 border border-silver-light text-center">
                                                    <div className="fs-1 text-dark"><i className="bi bi-box-arrow-right" /></div>
                                                    <NavLink to="/Login_Register"><h6 className="text-dark mt-2 mb-0" onClick={handleLogOut}>Logout</h6></NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="orders" role="tabpanel" aria-labelledby="orders-tab">
                                        <h5 className="fw-bold mb-3"> <i className="bi bi-bag me-2 text-gray" />Orders</h5>
                                        <table className="table orders">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Order ID</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Total Amount</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.map((orderItem) => (
                                                    <tr key={orderItem.id}>
                                                        <td className="text-gray" scope="row">#{orderItem.id}</td>
                                                        <td>{orderItem.date}</td>
                                                        <td>
                                                            {orderItem.status === 1 ? (
                                                                <span className="rounded-3px badge bg-success text-light py-2 px-3">Completed</span>
                                                            ) : (
                                                                <span className="rounded-3px badge bg-danger text-light py-2 px-3">Pending</span>
                                                            )}
                                                        </td>
                                                        <td> <span className="fw-bold">{orderItem.total_amount}</span></td>
                                                        <td> <a href="#" className="btn btn-dark btn-ecomm">View Order</a></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>


                                    <div className="tab-pane fade" id="downloades" role="tabpanel" aria-labelledby="downloades-tab">
                                        <h5 className="fw-bold mb-3"><i className="bi bi-download me-2 text-gray" />Downloads</h5>
                                        <table className="table orders">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product</th>
                                                    <th scope="col">Downloads</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-gray" scope="row">Red Falcon</td>
                                                    <td>5</td>
                                                    <td> <a href="#" className="btn btn-dark btn-ecomm">Download</a></td>
                                                </tr>
                                                <tr>
                                                    <td className="text-gray" scope="row">Warrior Z</td>
                                                    <td>3</td>
                                                    <td> <a href="#" className="btn btn-dark btn-ecomm">Download</a></td>
                                                </tr>
                                                <tr>
                                                    <td className="text-gray" scope="row">New Dawn</td>
                                                    <td>4</td>
                                                    <td> <a href="#" className="btn btn-dark btn-ecomm">Download</a></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="addresses" role="tabpanel" aria-labelledby="addresses-tab">
                                        <h5 className="fw-bold mb-3"><i className="bi bi-geo-alt me-2 text-gray" />Addresses</h5>
                                        <div className="row g-3">
                                            <div className="col-12 col-lg-6">
                                                <div className="border border-silver-light p-3">
                                                    <h6 className="text-dark">Billing Address</h6>
                                                    <p className="text-gray">You have not set up this type of address yet.</p>
                                                    <a href="#" className="btn btn-dark btn-ecomm btn-sm">Add</a>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-6">
                                                <div className="border border-silver-light p-3">
                                                    <h6 className="text-dark">Shipping Address</h6>
                                                    <p className="text-gray">You have not set up this type of address yet.</p>
                                                    <a href="#" className="btn btn-dark btn-ecomm btn-sm">Add</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="details" role="tabpanel" aria-labelledby="details-tab">
                                        <h5 className="fw-bold mb-3"><i className="bi bi-person-vcard me-2 text-gray" />Account Details</h5>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Avatar:</th>
                                                        <td>
                                                            {editingField === 'profile_image' ? (
                                                                <input type="file" onChange={handleChange} />
                                                            ) : (
                                                                <img src={customer.profile_image} className="w-25" />
                                                            )}
                                                        </td>
                                                        <td><i className="bi bi-pencil" onClick={() => handleEdit('profile_image')}></i></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Username:</th>
                                                        <td>{customer.username}</td>
                                                        <td><i className="bi bi-pencil" onClick={() => handleEdit('username')}></i></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Email:</th>
                                                        <td>{customer.email}</td>
                                                        <td><i className="bi bi-pencil" onClick={() => handleEdit('email')}></i></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Phone:</th>
                                                        <td>{customer.phone}</td>
                                                        <td><i className="bi bi-pencil" onClick={() => handleEdit('phone')}></i></td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Address:</th>
                                                        <td>{customer.address}</td>
                                                        <td><i className="bi bi-pencil" onClick={() => handleEdit('address')}></i></td>
                                                    </tr>
                                                </tbody>
                                                <button className="btn btn-primary" onClick={handleSave}>Save</button>
                                            </table>
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
            <Footer />
        </div>
    );
}
