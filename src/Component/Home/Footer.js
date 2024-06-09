import React from "react";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../style.css';

export default function Footer() {
  return (
    <div className="bg-dark py-lg-1 py-3">
      <div className="container">
        <footer>
          <div className="bg-dark pt-5 pb-4 text-start">
            <div className="pt-3"> 
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="footer-widget">
                    <h5 className="mb-4">About Us</h5>
                    <p className="mb-3 small">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar
                      neque. Nulla finibus lobortis pulvinar.
                    </p>
                    <ul>
                      <li className="mb-3">
                        <i className="text-primary me-1 bi bi-geo-alt"></i> 45 Park Avenue, NY
                      </li>
                      <li className="mb-3">
                        <i className="text-primary me-1 bi bi-envelope"></i> info@examplesite.com
                      </li>
                      <li className="mb-3">
                        <i className="text-primary me-1 bi bi-telephone-inbound"></i> (123) 123-456
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6">
                  <div className="footer-widget">
                    <h5 className="mb-4">Account</h5>
                    <ul className="footer-list text-dark">
                      <li><NavLink to="#">About Us</NavLink></li>
                      <li><NavLink to="#">Terms &amp; Conditions</NavLink></li>
                      <li><NavLink to="#">User&rsquo;s Guide</NavLink></li>
                      <li><NavLink to="#">Support Center</NavLink></li>
                      <li><NavLink to="#">Press Info</NavLink></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="footer-widget">
                    <h5 className="mb-4">Popular</h5>
                    <ul className="footer-list text-dark">
                      <li><NavLink to="single-product.html">Blue Training Shoes</NavLink></li>
                      <li><NavLink to="single-product.html">Popo Smart Phone P56</NavLink></li>
                      <li><NavLink to="single-product.html">Smart Watch A355S</NavLink></li>
                      <li><NavLink to="single-product.html">White Schoolbag</NavLink></li>
                      <li><NavLink to="single-product.html">Blue Training Shoes</NavLink></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <h5 className="mb-4">Sign Up Newsletter</h5>
                  <p className="small">
                    Sign Up for Our Newsletter to get Latest Updates and Offers. Subscribe to receive news in your
                    inbox.
                  </p>
                  <div className="input-group rounded-3px mt-4 mb-4">
                    <input className="form-control newsletter-input" type="text" placeholder="Enter Your Email" spellCheck="false" />
                    <button className="btn btn-primary newsletter-button" type="submit"><i className="far fa-paper-plane" aria-label="Send"></i></button>
                  </div>
                  <h6>Follow us</h6>
                  <ul className="d-flex gap-2 mt-3">
                    <li><NavLink className="x-icon bg-facebook shadow-sm bg-white" to="#"><i className="bi bi-facebook"></i></NavLink></li>
                    <li><NavLink className="x-icon bg-twitter shadow-sm bg-white" to="#"><i className="bi bi-twitter"></i></NavLink></li>
                    <li><NavLink className="x-icon bg-instagram shadow-sm bg-white" to="#"><i className="bi bi-instagram"></i></NavLink></li>
                    <li><NavLink className="x-icon hover-primary shadow-sm bg-white" to="#"><i className="bi bi-youtube"></i></NavLink></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom-footer py-lg-1 py-3"> 
            <div className="container">
              <div className="d-flex justify-content-between align-items-center">
                <p className="text-gray">&copy; 2024 t2307a. All Rights Reserved</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
