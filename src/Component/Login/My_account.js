import React, { useEffect, useState } from "react";
import '../style.css';
import Menu from "../Home/Menu";
import Footer from "../Home/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function My_account() {
    const [username, setUsername] = useState('');
    const [customer, setCustomer] = useState(null);
    const [editingField, setEditingField] = useState('');
    const [editedCustomer, setEditedCustomer] = useState({});
    const [order, setOrder] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [customer_id, setCustomer_id] = useState(null);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        const storedCustomerId = localStorage.getItem('customers_id');
        const storedUsername = localStorage.getItem('username');
        console.log("loggedInStatus:", loggedInStatus); // Kiểm tra giá trị loggedInStatus
        console.log("storedCustomerId:", storedCustomerId); // Kiểm tra giá trị storedCustomerId
        if (loggedInStatus === 'true' && storedCustomerId) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
            setCustomer_id(storedCustomerId);
        } else {
            setIsLoggedIn(false);
        }
    }, []);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customerResponse = await axios.get(`http://localhost:3010/pkdd/customers`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log('Customer data:', customerResponse.data);
                setCustomer(customerResponse.data[1]);
                setEditedCustomer({ ...customerResponse.data[1] });

                const ordersResponse = await axios.get(`http://localhost:3010/pkdd/orders`);
                console.log('Orders data:', ordersResponse.data);
                setOrder(ordersResponse.data);


                const balanceResponse = await axios.get(`http://localhost:3010/pkdd/customerbalance/${customer_id}`);
                console.log('Balance data:', balanceResponse.data);
                setBalance(balanceResponse.data.balance);
            
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error fetching data.');
            }
        };

        if (customer_id) {
            fetchData();
        }
    }, [customer_id]);

    const handleEdit = (field) => {
        setEditingField(field);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profile_image') {
            setEditedCustomer({ ...editedCustomer, [name]: files[0] });
        } else {
            setEditedCustomer({ ...editedCustomer, [name]: value });
        }
    };

    const handleSave = () => {
        const formData = new FormData();
        for (let key in editedCustomer) {
            formData.append(key, editedCustomer[key]);
        }

        axios.post('http://localhost:3010/pkdd/customers', formData)
            .then(response => {
                toast.success("Account info saved successfully!");
                setCustomer({ ...editedCustomer });
                setEditingField('');
            })
            .catch(error => {
                console.error('Error saving account info:', error);
                toast.error("Error saving account info!");
            });
    };

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('username');
        localStorage.removeItem('customers_id');
        setIsLoggedIn(false);
        toast.success("Logout success!");
        window.location.href = '/Login_Register';
    };

    if (!isLoggedIn) {
        return <Navigate to="/Login_Register" />;
    }
   

    return (
        <div className="py-2 top-header bg">
            <Menu />
            <div>
                <nav className="bg-light py-3" aria-label="breadcrumb">
                    <div className="container">
                        <ol className="breadcrumb breadcrump-light d-flex justify-content-center m-0">
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
                                    <li className="nav-item">
                                        <a className="text-gray border border-silver mb-2 nav-link active" data-bs-toggle="tab" data-bs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="true">
                                            <i className="bi bi-speedometer2 me-2" />Dashboard
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="text-gray border border-silver mb-2 nav-link" data-bs-toggle="tab" data-bs-target="#orders" type="button" role="tab" aria-controls="orders" aria-selected="true">
                                            <i className="bi bi-bag me-2" />Orders
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a className="text-gray border border-silver mb-2 nav-link" data-bs-toggle="tab" data-bs-target="#details" type="button" role="tab" aria-controls="details" aria-selected="true">
                                            <i className="bi bi-person-vcard me-2" />Account Details
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="text-gray border border-silver mb-2 nav-link" to="#" onClick={handleLogout}>
                                            <i className="bi bi-box-arrow-right me-2" />Logout
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-9">
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
                                        <h5 className="fw-bold">Hello, <span className="text-primary">{username}</span></h5>
                                        <p className="text-gray">From your account dashboard you can view your recent <a href="#">orders</a>, <a href="#">manage your shipping and billing addresses</a>, and edit your <a href="#">password and account details.</a></p>
                                        <div className="row">
                                            <div className="col-6 col-lg-4">
                                                <div className="custom-order mt-3 py-5 border border-silver-light text-center" data-bs-toggle="tab" data-bs-target="#orders" type="button">
                                                    <div className="fs-1 text-dark"><i className="bi bi-bag" /></div>
                                                    <h6 className="text-dark mt-2 mb-0">Orders</h6>
                                                </div>
                                            </div>

                                            <div className="col-6 col-lg-4">
                                                <div className="custom-order mt-3 py-5 border border-silver-light text-center" data-bs-toggle="tab" data-bs-target="#details" type="button">
                                                    <div className="fs-1 text-dark"><i className="bi bi-person-vcard" /></div>
                                                    <h6 className="text-dark mt-2 mb-0">Account Details</h6>
                                                </div>
                                            </div>
                                            
                                            <div className="col-6 col-lg-4">
                                                <div className="mt-3 py-5 border border-silver-light text-center">
                                                    <div className="fs-1 text-dark"><i className="bi bi-box-arrow-right" /></div>
                                                    <h6 className="text-dark mt-2 mb-0">Logout</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="orders" role="tabpanel" aria-labelledby="orders-tab">
                                        <h5 className="fw-bold mb-3"><i className="bi bi-bag me-2 text-gray" />Orders</h5>
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
                                                        <td className="text-gray" scope="row">#F{orderItem.id}</td>
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

                                    <div className="tab-pane fade" id="details" role="tabpanel" aria-labelledby="details-tab">
                                        <h5 className="fw-bold mb-3"><i className="bi bi-person-vcard me-2 text-gray" />Account Details</h5>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <tbody>
                                                    {customer && (
                                                        <>
                                                            <tr>
                                                                <th scope="row">Avatar:</th>
                                                                <td>
                                                                    {editingField === 'profile_image' ? (
                                                                        <input type="file" name="profile_image" onChange={handleChange} />
                                                                    ) : (
                                                                        customer.profile_image && <img src={customer.profile_image} className="w-25" alt="Avatar" />
                                                                    )}
                                                                </td>
                                                                <td><i className="bi bi-pencil" onClick={() => handleEdit('profile_image')}></i></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Username:</th>
                                                                <td>
                                                                    {editingField === 'username' ? (
                                                                        <input type="text" name="username" value={editedCustomer.username} onChange={handleChange} />
                                                                    ) : (
                                                                        customer.username
                                                                    )}
                                                                </td>
                                                                <td><i className="bi bi-pencil" onClick={() => handleEdit('username')}></i></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Email:</th>
                                                                <td>
                                                                    {editingField === 'email' ? (
                                                                        <input type="email" name="email" value={editedCustomer.email} onChange={handleChange} />
                                                                    ) : (
                                                                        customer.email
                                                                    )}
                                                                </td>
                                                                <td><i className="bi bi-pencil" onClick={() => handleEdit('email')}></i></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Phone:</th>
                                                                <td>
                                                                    {editingField === 'phone' ? (
                                                                        <input type="tel" name="phone" value={editedCustomer.phone} onChange={handleChange} />
                                                                    ) : (
                                                                        customer.phone
                                                                    )}
                                                                </td>
                                                                <td><i className="bi bi-pencil" onClick={() => handleEdit('phone')}></i></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row">Address:</th>
                                                                <td>
                                                                    {editingField === 'address' ? (
                                                                        <input type="text" name="address" value={editedCustomer.address} onChange={handleChange} />
                                                                    ) : (
                                                                        customer.address
                                                                    )}
                                                                </td>
                                                                <td><i className="bi bi-pencil" onClick={() => handleEdit('address')}></i></td>
                                                            </tr>
                                                        </>
                                                    )}
                                                </tbody>
                                            </table>
                                            <button className="btn btn-primary" onClick={handleSave}>Save</button>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="balance" role="tabpanel" aria-labelledby="balance-tab">
                                        <h5 className="fw-bold mb-3"><i className="bi bi-wallet me-2 text-gray" />Account Balance</h5>
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Balance:</th>
                                                        <td>${balance}</td>
                                                        <td><NavLink to="/PaymentForm"><i className="fa fa-plus" /></NavLink></td>
                                                    </tr>
                                                </tbody>
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
