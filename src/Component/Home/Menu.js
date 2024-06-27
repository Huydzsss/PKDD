import React, { useState, useEffect } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style.css';

export default function Menu() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [modal, setModal] = useState([])
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập từ localStorage hoặc API
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);
  useEffect(() => {
    axios.get('http://localhost:3010/pkdd/products')
      .then(response => {
        setModal(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);


  return (
    <div className="bg-dark py-lg-1 py-3">
      <div className='container'>
        <div className="row position-relative align-items-center">
          <div className="col-lg-2 col-6">
            <NavLink to="/" className="logo">
              <img className="img-fluid" src={`${process.env.PUBLIC_URL}/assets/images/logo-white.png`} alt="logo" style={{ height: 48 }} />
            </NavLink>
          </div>
          <div className="col-lg-7 d-none d-lg-block">
            <ul className="nav main-nav gap-3 text-lights-lead justify-content-center py-2">
              <li className="nav-item small">
                <NavLink to="/" className="nav-link fw-bold py-3 px-1 hover:text-lights fs-6">Home</NavLink>
              </li>
              <li className="nav-item small">
                <NavLink to="/Shop" className="nav-link fw-bold py-3 px-1 hover:text-lights fs-6">Shop</NavLink>
              </li>
              <li className="nav-item dropdown- small"><a className="nav-link dropdown-toggle fw-bold py-3 px-1 hover:text-primary fs-6" to="#">Categories </a>
                <div className="dropdown-menu mega-menu">
                  <ul className="row">
                      <li className="child-mega col-lg-3" >
                        <p className="mega-title text-uppercase mb-0">By Accessory Type</p>
                        <ul className="flex flex-column gap-2">
                        <li><NavLink className="mega-link" to="/SortBattery" >Battery</NavLink></li>
                        <li><NavLink className="mega-link" to="/Cables" >Cables & Chargers</NavLink></li>
                        <li><NavLink className="mega-link" to="/SortHeadphones" >Headphones</NavLink></li>
                        <li><NavLink className="mega-link" to="/SortScreen" >Screen Protectors</NavLink></li>
                        <li><NavLink className="mega-link" to="/SortPhoneCase" >Phone Case</NavLink></li>
                      </ul>
                      </li>
                    <li className="child-mega col-lg-3">
                      <p className="mega-title text-uppercase mb-0">By Brand</p>
                      <div className="d-flex flex-wrap">
                        <div className="col-6 pt-3 pe-2">
                          <NavLink to="/Samsung">
                            <img className="border border-silver-light w-100" src="assets\images\NSX\drop-brand-01.png" alt="Model 01" />
                          </NavLink>
                        </div>
                        <div className="col-6 pt-3 pe-2">
                          <NavLink to="/Xiaomi">
                            <img className="border border-silver-light w-100" src="assets\images\NSX\drop-brand-02.png" alt="Model 02" />
                          </NavLink>
                        </div>
                        <div className="col-6 pt-3 pe-2">
                          <NavLink to="/Apple">
                            <img className="border border-silver-light w-100" src="assets\images\NSX\drop-brand-03.png" alt="Model 03" />
                          </NavLink>
                        </div>
                        <div className="col-6 pt-3 pe-2">
                          <NavLink to="/Huawei">
                            <img className="border border-silver-light w-100" src="assets\images\NSX\drop-brand-04.png" alt="Model 04" />
                          </NavLink>
                        </div>
                        <div className="col-6 pt-3 pe-2">
                          <NavLink to="/Oppo">
                            <img className="border border-silver-light w-100" src="assets\images\NSX\drop-brand-05.png" alt="Model 05" />
                          </NavLink>
                        </div>
                        <div className="col-6 pt-3 pe-2">
                          <NavLink to="/Nokia">
                            <img className="border border-silver-light w-100" src="assets\images\NSX\drop-brand-06.png" alt="Model 06" />
                          </NavLink>
                        </div>
                      </div>
                    </li>
                    <li className="child-mega col-lg-3">
                      <p className="mega-title text-uppercase mb-0">eCommerce</p>
                      <ul className="flex flex-column gap-2">
                        <li><NavLink className="mega-link" to="/Cart">Shopping Cart</NavLink></li>
                        <li><NavLink className="mega-link" to="/Compare">Compare</NavLink></li>
                        <li><NavLink className="mega-link" to="/My_account">My account</NavLink></li>
                      </ul>
                    </li>
                    <li className="child-mega col-lg-3">
                      <p className="mega-title text-uppercase mb-0">By Phone type</p>
                      <ul className="flex flex-column gap-2">
                        <li><NavLink className="mega-link" to="/SortSmartPhone">SmartPhone</NavLink></li>
                        <li><NavLink className="mega-link" to="/SortHPhone">High-end phone</NavLink></li>
                        
                      </ul>
                    </li>

                  </ul>
                </div>
              </li>
              
              <li className="nav-item small">
                <NavLink to="/Contact" className="nav-link fw-bold py-3 px-1 hover:text-lights fs-6">Contact Us</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-2 col-6 small">
            <div className="d-flex gap-4 align-items-center justify-content-end">
              <NavLink to="/Compare" className="d-none d-lg-flex text-white flex-column align-items-center position-relative">
                <i className="bi bi-arrow-left-right h5 m-0"></i>
              </NavLink>
              {isLoggedIn && (
                <>
                  <NavLink to="/My_account" className="text-white d-none d-lg-flex flex-column align-items-center position-relative">
                    <i className="bi bi-person-circle h5 m-0"></i>
                  </NavLink>
                </>
              )}
              {/* Nếu chưa đăng nhập, hiển thị nút Login/Register */}
              {!isLoggedIn && (
                <NavLink to="/Login_Register" className="text-white d-none d-lg-flex flex-column align-items-center position-relative">
                  <i className="bi bi-person-circle h5 m-0"></i>
                </NavLink>
              )}
              <NavLink to="/" className="text-white d-flex flex-column btn-cart-offcanvas align-items-center position-relative">
                <i className="bi bi-bag-fill h5 m-0"></i>
                <span className="badge-circle text-white"></span>
              </NavLink>
              <NavLink to="/" className="text-white d-lg-none d-flex flex-column align-items-center" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
                <i className="bi bi-list h4 m-0"></i>
              </NavLink>
            </div>
          </div>
          <div className="offcanvas offcanvas-start offcanvas-295" id="offcanvasScrolling" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} aria-labelledby="offcanvasScrollingLabel">
            <div className="offcanvas-header offcanvas-border-light bg-dark py-lg-1 py-3">
              <div className="offcanvas-title col-5" id="offcanvasScrollingLabel">
                <NavLink className="logo" to="#">
                  <img className="max-width-180-" src="assets/images/logo-white.png" alt />
                </NavLink>
              </div>
              <button className="btn btn-light btn-sm rounded-circle x-icon small d-flex align-items-center justify-content-center" type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <div className="offcanvas-body">
              <div className="border input-group group-circle mx-auto w-100">
                <input className="form-control border-0" type="text" placeholder="Search" />
                <button className="btn px-3 newsletter-button" type="submit"><i className="fa-solid fa-magnifying-glass" /></button>
              </div>
              <ul className="mobile-menu">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    <span><i className="bi bi-house me-1" />Home</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Shop">
                    <span><i className="bi bi-basket me-1" />Shop</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="#">
                    <span><i className="bi bi-shop me-1" />Product Layouts</span>
                    <i className="arrow small fa-solid fa-chevron-down" />
                  </NavLink>
                  <ul className="hidden">
                    <li><NavLink className="dropdown-item" to="single-product.html">Product Simple</NavLink></li>
                    <li><NavLink className="dropdown-item" to="single-product-variable.html">Variations Swatches</NavLink></li>
                    <li><NavLink className="dropdown-item" to="single-product-vertical.html">Vertical Gallery</NavLink></li>
                    <li><NavLink className="dropdown-item" to="#">With Video</NavLink></li>
                    <li><NavLink className="dropdown-item" to="#">With Countdown Timer</NavLink></li>
                    <li><NavLink className="dropdown-item" to="#">Product Presentation</NavLink></li>
                    <li><NavLink className="dropdown-item" to="shop-list-view.html">List View</NavLink></li>
                    <li><NavLink className="dropdown-item" to="#">Details Gallery</NavLink></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="#">
                    <span><i className="bi bi-archive me-1" />E-Commerce</span>
                    <i className="arrow small fa-solid fa-chevron-down" />
                  </NavLink>
                  <ul className="hidden">
                    <li><NavLink className="dropdown-item" to="/Cart">Shopping Cart</NavLink></li>
                    <li><NavLink className="dropdown-item" to="#">Track Your Order</NavLink></li>
                    <li><NavLink className="dropdown-item" to="compare.html">Compare</NavLink></li>
                    <li><NavLink className="dropdown-item" to="wishlist.html">Wishlist</NavLink></li>
                    <li><NavLink className="dropdown-item" to="checkout.html">Checkout</NavLink></li>
                    <li><NavLink className="dropdown-item" to="my-account.html">My account</NavLink></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Contact">Contact Us</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
