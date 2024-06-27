import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const loggedInCustomerId = localStorage.getItem('customers_id');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = () => {
        axios.get('http://localhost:3010/pkdd/shopping_cart')
            .then(response => {
                setCartItems(response.data);
                const subtotal = response.data.reduce((acc, item) => acc + (item.quantity * item.price), 0);
                setSubtotal(subtotal);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
                setError('Error fetching cart items. Please try again later.');
                setLoading(false);
            });
    };

    const handleQuantityChange = (index, delta) => {
        setCartItems(prevCartItems => {
            const updatedCartItems = [...prevCartItems];
            const updatedItem = { ...updatedCartItems[index] };
            updatedItem.quantity += delta;

            if (updatedItem.quantity > 0) {
                updatedCartItems[index] = updatedItem;
                setSubtotal(updatedCartItems.reduce((acc, item) => acc + (item.quantity * item.price), 0));
                updateCartItem(updatedItem);
                return updatedCartItems;
            } else {
                return prevCartItems;
            }
        });
    };

    const updateCartItem = (updatedItem) => {
        axios.put(`http://localhost:3010/pkdd/shopping_cart/${updatedItem.cart_id}`, updatedItem)
            .then(response => {
                console.log('Cart item updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating cart item:', error);
            });
    };

    const handleRemoveItem = (cartId) => {
        axios.delete(`http://localhost:3010/pkdd/shopping_cart/${cartId}`)
            .then(response => {
                console.log('Item removed successfully:', response.data.message);
                const updatedCartItems = cartItems.filter(item => item.cart_id !== cartId);
                setCartItems(updatedCartItems);
            })
            .catch(error => {
                if (error.response) {
                    console.error('Error removing item from cart:', error.response.data);
                    if (error.response.status === 404) {
                        console.log('Product not found in shopping cart');
                    }
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error setting up request:', error.message);
                }
            });
    };

    const createOrder = async (data, actions) => {
        try {
            const response = await axios.post('http://localhost:3010/pkdd/paypal_payment', {
                customers_id: loggedInCustomerId,
                total_amount: subtotal.toFixed(2),
                currency: 'USD'
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const { approvalUrl } = response.data;
            if (approvalUrl) {
                window.location.href = approvalUrl;
            } else {
                throw new Error('No approval URL found in PayPal response');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error('Failed to create order. Please try again.');
        }
    };

    return (
        <PayPalScriptProvider options={{ "client-id": "AVbgXa0_Z4AvObH0JDz6-qd4yfCLua0Cg-GREsGUacOdZ99106QolDRSc6HxfMcuvFe0-L_mcVLd-ng1" }}>
            <div>
                <Menu />
                <div>
                    <div className="py-5 bg-image-center text-white text-center bg-light" style={{ backgroundImage: 'url(assets/images/banners/banner-01.jpg)' }}>
                        <div className="container py-3">
                            <h1 className="h2 mb-3 fw-bold text-uppercase">Shopping Cart</h1>
                            <ol className="breadcrumb breadcrump-light d-flex justify-content-center m-0">
                                <li className="breadcrumb-item"><a className="text-white" href="#"><i className="bi bi-house-door"> </i>Home</a></li>
                                <li className="breadcrumb-item text-light active" aria-current="page">Shop</li>
                            </ol>
                        </div>
                    </div>
                    <div className="container py-5">
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div className="row">
                                <div className="col-lg-8">
                                    <table className="table mt-5 mb-0">
                                        <thead>
                                            <tr>
                                                <th className="text-uppercase smaller text-gray">Product Name</th>
                                                <th />
                                                <th className="text-uppercase smaller text-gray">Price</th>
                                                <th className="text-uppercase smaller text-gray">Quantity</th>
                                                <th className="text-uppercase smaller text-gray">Total</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody className="align-middle">
                                            {cartItems.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="py-4" style={{ width: '8rem' }}>
                                                        <a href={`single-product.html?id=${item.product_id}`}>
                                                            <img className="w-100" src={item.product_image1} alt={item.product_name} />
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <a className="text-dark fs-6 fw-bold" href={`single-product.html?id=${item.product_id}`}>
                                                            {item.product_name}
                                                        </a>
                                                    </td>
                                                    <td className="pe-3" style={{ width: '8rem' }}><span>${item.price.toFixed(2)}</span></td>
                                                    <td className="pe-4" style={{ width: '9rem' }}>
                                                        <div className="input-group input-group-sm">
                                                            <button className="btn-mins btn text-gray border rounded-0 newsletter-button" type="button" onClick={() => handleQuantityChange(index, -1)}><i className="fa-solid fa-minus" /></button>
                                                            <input className="py-2 form-control text-center fw-bold newsletter-input" type="number" value={item.quantity} readOnly />
                                                            <button className="btn-plus btn text-gray border rounded-0 newsletter-button" type="button" onClick={() => handleQuantityChange(index, 1)}><i className="fa-solid fa-plus" /></button>
                                                        </div>
                                                    </td>
                                                    <td style={{ width: '7rem' }}><span className="fw-bold">${(item.quantity * item.price).toFixed(2)}</span></td>
                                                    <td><a className="text-gray" href="#" onClick={() => handleRemoveItem(item.cart_id)}><i className="bi bi-x-circle-fill" /></a></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="w-100 my-4 d-inline-flex justify-content-between align-items-center">
                                        
                                        <a className="btn btn-dark rounded-0" href="#">Update Cart</a>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="p-4 mt-5 bg-light shadow-sm border border-silver">
                                        <h6 className="border-bottom pb-3 mb-3">Order Summary</h6>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between small mb-2">
                                                <span className="fw-bold text-gray">Subtotal</span>
                                                <span className="fw-bold">${subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between small mb-2">
                                                <span className="fw-bold text-gray">Shipping</span>
                                                <div className="w-50">
                                                    <div className="d-flex">
                                                        <select className="form-select small">
                                                            <option value="1">Free Shipping</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-top pt-3 mb-5 d-flex justify-content-between">
                                            <span className="h6 fw-bold">Total</span>
                                            <span className="h6 fw-bold">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <PayPalButtons
                                            style={{ layout: "vertical" }}
                                            createOrder={createOrder}
                                            onApprove={(data, actions) => {
                                                return actions.order.capture().then((details) => {
                                                    toast.success(`Thanh toán thành công, cảm ơn ${details.payer.name.given_name}!`);
                                                    // Xóa các mặt hàng sau khi thanh toán thành công
                                                    setCartItems([]);
                                                    setSubtotal(0);
                                                    navigate('/'); // Điều hướng đến trang chủ
                                                });
                                            }}
                                            onError={(err) => {
                                                toast.error('Lỗi khi xử lý thanh toán PayPal. Vui lòng thử lại.');
                                            }}
                                        />

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </PayPalScriptProvider>
    );
}
