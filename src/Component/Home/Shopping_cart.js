import React, { useState, useEffect } from "react";
import '../style.css';
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Shopping_cart() {
    const [cartItems, setCartItems] = useState([]);
    const [subtotalValue, setSubtotalValue] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3010/products/shopping_cart')
            .then(response => {
                const cartData = response.data.map(item => {
                    return {
                        ...item,
                        image: item.product.image1,
                        name: item.product.name
                    };
                });
                setCartItems(cartData);
                
                const subtotal = cartData.reduce((total, item) => total + (item.quantity * item.price), 0);
                setSubtotalValue(subtotal);
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
            });
    }, []);

    return (
        <div>
            <div className="container">
                <div>
                    <div className="hidden cart-ovelay" />
                    <div className="hidden- cart-offcanvas bg-white h-100 shadow-sm" style={{ width: 320 }}>
                        <div className="p-4">
                            <div className="pb-3 border-bottom d-flex align-items-center justify-content-between">
                                <p className="text-uppercase fs-6 fw-bold m-0">Shopping Cart</p>
                                <NavLink className="close-cart-offcanvas text-muted small" to="#">
                                    Close<i className="ms-1 fa-solid fa-arrow-right-long" />
                                </NavLink>
                            </div>
                            <div className="cart-body">
                                {cartItems.length > 0 && cartItems.map((item, index) => (
                                    <div key={index} className="border-bottom border-silver py-3 d-flex align-items-center gap-3">
                                        <NavLink className="d-block" to={item.link} style={{ maxWidth: 80 }}>
                                            <img className="border border-silver" src={item.image} alt={item.name} />
                                        </NavLink>
                                        <div>
                                            <NavLink className="d-block small fw-bold text-dark mb-1" to={item.link}>
                                                {item.name}
                                            </NavLink>
                                            <span className="text-muted small">
                                                <span className="me-1">{item.quantity}</span>x
                                                <span className="ms-1">{item.price}</span>
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="cart-footer">
                                <div className="py-3 d-flex algin-items-center justify-content-between">
                                    <span className="fs-6 fw-bold text-dark">SubTotal:</span>
                                    <span className="fs-6 fw-bold">${subtotalValue}</span>
                                </div>
                                <div className="d-flex gap-3 py-3">
                                    <NavLink className="btn btn-outline-dark rounded-0 fw-bold w-50" to="cart.html">
                                        View Cart
                                    </NavLink>
                                    <NavLink className="btn btn-primary rounded-0 fw-bold w-50" to="checkout.html">
                                        Checkout
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
