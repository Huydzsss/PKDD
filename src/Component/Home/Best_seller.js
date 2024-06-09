import React from "react";
import '../style.css';
import { NavLink } from 'react-router-dom'; 

export default function Best_seller() {
    return (
        <div classNameName="bg-dark py-lg-1 py-3">
            <div className="container">

                <div className="py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="mb-3 mb-md-0 bg-image-center d-flex justify-content-end p-4" style={{ height: 200, backgroundImage: 'url(assets/images/banners/banner-7.jpg)' }}>
                                    <div className="w-50">
                                        <h5 className="text-warning">Best Seller</h5>
                                        <h5 className="text-white fw-bold text-uppercase line-height-1">
                                            Fashion Apple<br />Accessories</h5><NavLink className="btn btn-warning btn-sm rounded-0 mt-2">Get It Now</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="mb-3 my-md-0 bg-image-center d-flex justify-content-start p-4" style={{ height: 200, backgroundImage: 'url(assets/images/banners/product-banner-1.jpg)' }}>
                                    <div className="w-50">
                                        <h5 className="text-primary">Best Seller</h5>
                                        <h5 className="text-dark fw-bold text-uppercase line-height-1">
                                            Fashion Apple<br />Accessories</h5><NavLink className="btn btn-primary btn-sm rounded-0 mt-2">Get It Now</NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="mb-3 my-md-0 bg-image-center d-flex justify-content-start p-4" style={{ height: 200, backgroundImage: 'url(assets/images/banners/1-1.jpg)' }}>
                                    <div className="w-50">
                                        <h5 className="text-warning">Best Seller</h5>
                                        <h5 className="text-white fw-bold text-uppercase line-height-1">
                                            Fashion Apple<br />Accessories</h5><NavLink className="btn btn-warning btn-sm rounded-0 mt-2">Get It Now</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}