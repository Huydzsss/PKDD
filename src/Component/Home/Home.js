import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import Menu from './Menu';
import Footer from './Footer';
import Best_product from './Best_product';
import Best_seller from './Best_seller';
import Features_product from './Features_product';
import Sale_today from './Sale_today';
import New_products from './New_products';
import Shopping_cart from './Shopping_cart';
import { NavLink } from 'react-router-dom';

export default function Home() {

    return (
        <div>
            <div className="bg-dark py-lg-1 py-3">
                <div className="container">
                    <Menu />
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="main-slider slider-arrow-rounded mt-4" id="home-slider-01">
                        <div className="slide">
                            <div className="position-relativ center-image rounded-3" style={{ minHeight: 430, backgroundImage: 'url(assets/images/sliders/slider-01.png)' }}>
                                <div className="text-center- text-white- p-5 d-flex flex-column justify-content-center position-absolute top-0 left-0 w-50 h-100 bg-blue-100-">
                                    <h5 className="fw-bold mb-2 text-uppercase" data-animation="fadeInUp" data-delay="1s">
                                        only <span className="text-primary">50% OFF</span></h5>
                                    <h1 className="w-50- fw-bold mb-2" data-animation="fadeInLeft" data-delay="1s">Latest smartphones
                                    </h1>
                                    <p className="text-dark- fw-bold-" data-animation="fadeInUp" data-delay="1s">Latest Phones on the Market
                                    </p>
                                    <div data-animation="fadeInDown" data-delay="1s"><NavLink className="btn btn-primary py-2 px-4 rounded-0 mt-3">Shop
                                        Now</NavLink></div>
                                </div>
                            </div>
                        </div>
                        <div className="slide">
                            <div className="position-relative text-white center-image rounded-3" style={{ minHeight: 430, backgroundImage: 'url(assets/images/slider-2.png)' }}>
                                <div className="p-5 d-flex flex-column justify-content-center position-absolute top-0 left-0 w-50 h-100 bg-blue-100-">
                                    <h5 className="fw-bold mb-2 text-uppercase text-primary" data-animation="fadeInLeftBig" data-delay="1s">Summer</h5>
                                    <h1 className="w-50- fw-bold mb-2 " data-animation="zoomIn" data-delay="1s">Top New summer Collection</h1>
                                    <p className="text-light fw-bold" data-animation="zoomInRight" data-delay="1s">Get it form 50% off</p>
                                    <div data-animation="fadeInUp" data-delay="1s"><NavLink className="btn btn-primary py-2 px-4 rounded-0 mt-3">Shop
                                        Now</NavLink></div>
                                </div>
                            </div>
                        </div>
                        <div className="slide">
                            <div className="position-relativ center-image rounded-3" style={{ minHeight: 430, backgroundImage: 'url(assets/images/sliders/slider-03.webp)' }}>
                                <div className="overflow-hidden text-center- text-white- p-5 d-flex flex-column justify-content-center position-absolute top-0 end-0 w-50 h-100 bg-blue-100-">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Best_product />
            <Best_seller />
            <Features_product />
            <Sale_today />
            <New_products />
            <Footer />
            <Shopping_cart />
            
        </div>
    )
}

