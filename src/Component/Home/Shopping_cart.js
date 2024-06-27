import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import '../style.css'


export default function Shopping_cart() {
    const [cartItems, setCartItems] = useState([]);
    const [subtotalValue, setSubtotalValue] = useState(0);
    const [error, setError] = useState(null); 
    const [showViewCartButton, setShowViewCartButton] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:3010/pkdd/shopping_cart')
            .then(response => {
                
                console.log('Response data:', response.data);
                const cartData = response.data.map(item => {
                    return {
                        ...item,
                        image: item.product_image1 || "default_image.jpg", 
                        name: item.product_name || "No name" 
                    };
                });
                
                setCartItems(cartData);

                const subtotal = cartData.reduce((total, item) => total + (item.quantity * item.price), 0);
                setSubtotalValue(subtotal);

                // Kiểm tra xem giỏ hàng có ít hơn 4 mục không
                if (cartData.length < 4) {
                    setShowViewCartButton(true);
                } else {
                    setShowViewCartButton(false);
                }
                
            })
            .catch(error => {
                console.error('Error fetching cart items:', error);
                setError('Error fetching cart items. Please try again later.');
            });
    }, []);

    return (
        <div className="container">
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
                        {error ? ( // Display error message if there's an error
                            <p>{error}</p>
                        ) : (
                            cartItems.length > 0 ? cartItems.map((item, index) => (
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
                                            <span className="ms-1">${item.price}</span>
                                        </span>
                                    </div>
                                </div>
                            )) : <p>Your cart is empty</p>
                        )}
                    </div>
                    <div className="cart-footer">
                        <div className="py-3 d-flex align-items-center justify-content-between">
                            <span className="fs-6 fw-bold text-dark">SubTotal:</span>
                            <span className="fs-6 fw-bold">${subtotalValue}</span>
                        </div>
                        <div className="d-flex gap-3 py-3">
                            {showViewCartButton && (
                                <NavLink className="btn btn-outline-dark rounded-0 fw-bold w-50" to="/Cart">
                                    View Cart
                                </NavLink>
                            )}
                            <NavLink className="btn btn-primary rounded-0 fw-bold w-50" to="checkout.html">
                                Checkout
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
