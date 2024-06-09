import React, { useState, useEffect } from "react";
import '../style.css';
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import Menu from "./Menu";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Product_detail() {
    const { productId } = useParams();
    const parsedProductId = parseInt(productId);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3010/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);
    useEffect(() => {
        axios.get('http://localhost:3010/products/new_products')
            .then(response => {
                setNewProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);
    useEffect(() => {
        const foundProduct = products.find(product => product.id === parsedProductId);
        if (foundProduct) {
            setSelectedProduct(foundProduct);
        } else {
            setSelectedProduct(null);
        }
    }, [parsedProductId, products]);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const getImage = () => {
        if (!selectedProduct) return '';
        return selectedImageIndex === 0 ? selectedProduct.image1 : selectedProduct.image2;
    };


    return (
        <div className="text-start">
            <div className="py " >
                <Menu />
                <div className="row ">
                    <div className="row ">
                        <nav className="bg-light py-3 d-flex " aria-label="breadcrumb">
                            <div className="container">
                                <ol className="breadcrumb breadcrump-light  d-flex justify-content-center m-0">
                                    <li className="breadcrumb-item small"><a className="text-dark" href="/"><i className="bi bi-house-door"> </i>Home</a></li>
                                    <li className="breadcrumb-item small active" aria-current="page">Product detail</li>
                                </ol>
                            </div>
                        </nav>
                    </div>

                    <div className="col-lg-5">
                        <div className="carousel-horizontal-container">
                            <div className="single-product-carousel-horizontal border border-silver">
                                {selectedProduct && (
                                    <div className="slider-zoom ">
                                        <img src={`${process.env.PUBLIC_URL}/${getImage()}`} alt="" className="img-fluid" style={{ height: "500px", width: "500px" }} />
                                    </div>
                                )}
                            </div>
                            <div className="d-flex silder-horizontal-nav mt-2  ">
                                {selectedProduct && (
                                    <>
                                        {/* {selectedProduct.image1 && (
                                            <div className="slider-item border border-silver" onClick={() => handleImageClick(0)}>
                                                <img className="img-fluid " src={`${process.env.PUBLIC_URL}/${selectedProduct.image1}`} alt="Image 1" />
                                            </div>
                                        )} */}
                                        {/* {selectedProduct.image2 && (
                                            <div className="slider-item border border-silver" onClick={() => handleImageClick(1)}>
                                                <img className="img-fluid " src={`${process.env.PUBLIC_URL}/${selectedProduct.image2}`} alt="Image 2" />
                                            </div>
                                        )} */}
                                    </>
                                )}
                            </div>


                        </div>
                    </div>
                    <div className="col-lg-7 ">
                        <div className="text-start">
                            <NavLink className="d-block mb-1 text-muted small" to="#">{selectedProduct && selectedProduct.category}</NavLink>
                            <h4 className="mb-2">{selectedProduct && selectedProduct.name}</h4>
                            <div className="d-flex align-items-center gap-2 small">
                                <div className="text-silver-lead">
                                    {selectedProduct && [...Array(selectedProduct.rating)].map((_, index) => (
                                        <i key={index} className="bi bi-star-fill text-warning"></i>
                                    ))}
                                    {selectedProduct && [...Array(5 - selectedProduct.rating)].map((_, index) => (
                                        <i key={index} className="bi bi-star-fill"></i>
                                    ))}
                                </div>
                                <span className="text-gray"> (3 customer reviews)</span>
                            </div>
                            <div className="mt-2">
                                <span className="fs-5 text-muted text-decoration-line-through me-2">${selectedProduct && selectedProduct.price + 20}.00</span>
                                <span className="fs-3 text-dark fw-bold">${selectedProduct && selectedProduct.price}.00</span>
                            </div>
                            
                            <ul className="small list-unstyled">
                                <li className="mb-1"><span className="me-2 text-muted">SUK:</span><span className="text-dark fw-bold">NTB7SDVX44</span></li>
                                <li className="mb-1"><span className="me-2 text-muted">Category:</span><span className="text-dark fw-bold">CamerNavLink &amp; Media</span></li>
                                <li className="mb-1"><span className="me-2 text-muted">Tags:</span><NavLink className="text-dark fw-bold" to="#">CamerNavLink</NavLink>, <NavLink className="text-dark fw-bold" to="#">Video</NavLink></li>
                            </ul>
                            <div className="d-flex align-items-center gap-2 mt-4">
                                <div className="quantity-group">
                                    <div className="input-group input-group-sm">
                                        <button className="btn-mins btn text-gray border rounded-0 newsletter-button" id="button-addon1" type="button">
                                            <i className="fa-solid fa-minus"></i>
                                        </button>
                                        <input className="py-2 form-control text-center fw-bold newsletter-input w-1" type="number" min="1" defaultValue="1" />
                                        <button className="btn-plus btn text-gray border rounded-0 newsletter-button" id="button-addon2" type="button">
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                </div>

                                <NavLink className="rounded-0 px-4 btn btn-primary mx-1" to="#"><i className="bi bi-basket me-2"></i>Add To Cart</NavLink>
                                <NavLink className="btn rounded-0 shadow-sm border" to="#"><i className="bi bi-arrow-left-right"></i></NavLink>
                            </div>
                            <div className="d-flex align-items-center mt-4">
                                <span className="me-2 text-muted">Share:</span>
                                <NavLink className="social-x-icon rounded-circle shadow-sm border me-2" to="#"><i className="bi bi-facebook"></i></NavLink>
                                <NavLink className="social-x-icon rounded-circle shadow-sm border me-2" to="#"><i className="bi bi-twitter"></i></NavLink>
                                <NavLink className="social-x-icon rounded-circle shadow-sm border me-2" to="#"><i className="fa-solid fa-envelope"></i></NavLink>
                            </div>
                            <ul className="mt-3 list-unstyled">
                                <li className="mt-1 smaller"><i className="text-muted me-1 fa-regular fa-circle-check"></i><span className="text-secondary">30 days easy returns</span></li>
                                <li className="mt-1 smaller"><i className="text-muted me-1 fa-regular fa-circle-check"></i><span className="text-secondary">Order yours before 2.30pm for same day dispatch</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="py-4">
                    <div className="container">
                        <div className="row">
                            <ul className="nav nav-pills- justify-content-center text-dark-lead border-bottom">
                                <li className="nav-item"><a className="fs-5 px-4 rounded-0 hover:bottom-line nav-link active" id="description-tab" href="#" data-bs-toggle="tab" data-bs-target="#description" role="tab" aria-controls="description" aria-selected="true">Description</a></li>
                                <li className="nav-item"><a className="fs-5 px-4 rounded-0 hover:bottom-line nav-link" id="additional-info-tab" href="#" data-bs-toggle="tab" data-bs-target="#additional-info" role="tab" aria-controls="additional-info" aria-selected="false">Additional information</a></li>
                                <li className="nav-item"><a className="fs-5 px-4 rounded-0 hover:bottom-line nav-link" id="reviews-tab" href="#" data-bs-toggle="tab" data-bs-target="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews (3)</a></li>
                            </ul>
                            <div className="tab-content text-start">
                                <div className="pt-4 tab-pane fade show active" id="description" role="tabpanel" aria-labelledby>
                                    <div className="mb-3">
                                        <h5>Introduction</h5>
                                        <p className="text-gray">{selectedProduct && selectedProduct.description}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h5>Features :</h5>
                                        <ul>
                                            <li className="mt-2 text-muted"><i className="small text-primary fa-solid fa-check me-2" />slim body with metal cover</li>
                                            <li className="mt-2 text-muted"><i className="small text-primary fa-solid fa-check me-2" />latest Intel Core i5-1135G7 processor (4 cores / 8 threads)</li>
                                            <li className="mt-2 text-muted"><i className="small text-primary fa-solid fa-check me-2" />8GB DDR4 RAM and fast 512GB PCIe SSD</li>
                                            <li className="mt-2 text-muted"><i className="small text-primary fa-solid fa-check me-2" />NVIDIA GeForce MX350 2GB GDDR5 graphics card backlit keyboard, touchpad with gesture support</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="tab-pane pt-4" id="additional-info" role="tabpanel" aria-labelledby="additional-info-tab">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-9">
                                            <table className="table border border-silver">
                                                <tbody><tr>
                                                    <th className="bg-light w-50 p-3">Color</th>
                                                    <td className="p-3">Mystic black</td>
                                                </tr>
                                                    <tr>
                                                        <th className="bg-light w-50 p-3">Model Name</th>
                                                        <td className="p-3">AZ401RD</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-light w-50 p-3">Maximum Webcam Image Resolution</th>
                                                        <td className="p-3">16 MP</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-light w-50 p-3">Photo Sensor Size</th>
                                                        <td className="p-3">1/2.3-inch</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-light w-50 p-3">Image Stabilization</th>
                                                        <td className="p-3">Optical</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-light w-50 p-3">Max Shutter Speed</th>
                                                        <td className="p-3">1/2000 s</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-light w-50 p-3">Min Shutter Speed</th>
                                                        <td className="p-3">30 seconds</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-light w-50 p-3">Form Factor</th>
                                                        <td className="p-3">Bridge</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-light w-50 p-3">Effective Still Resolution</th>
                                                        <td className="p-3">16.1 MP</td>
                                                    </tr>
                                                    <tr>
                                                        <th className="bg-light w-50 p-3">Special Feature</th>
                                                        <td className="p-3">Image Stabilization</td>
                                                    </tr>
                                                </tbody></table>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="pt-4 pb-1"> <span className="me-2 fw-bold fs-1">4.5</span>
                                                <div className="d-inline-flex align-items-center">
                                                    <div className="smaller text-silver-lead"><i className="text-warning fa-solid fa-star" /><i className="text-warning fa-solid fa-star" /><i className="text-warning fa-solid fa-star" /><i className="text-warning fa-solid fa-star" /><i className="fa-solid fa-star" /></div><span className="ms-2 smaller text-gray">(3 customer reviews)</span>
                                                </div>
                                            </div>
                                            <div className="w-100 rating-prograss-group">
                                                <div className="d-flex align-items-center gap-2 mb-2"><span className="small text-gray">5 Star</span>
                                                    <div className="progress w-75" style={{ height: 10 }}>
                                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '82%' }} aria-valuenow={82} aria-valuemin={0} aria-valuemax={100} />
                                                    </div><span className="text-gray">82%</span>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 mb-2"><span className="small text-gray">4 Star</span>
                                                    <div className="progress w-75" style={{ height: 10 }}>
                                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '30%' }} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} />
                                                    </div><span className="text-gray">30%</span>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 mb-2"><span className="small text-gray">3 Star</span>
                                                    <div className="progress w-75" style={{ height: 10 }}>
                                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '15%' }} aria-valuenow={15} aria-valuemin={0} aria-valuemax={100} />
                                                    </div><span className="text-gray">15%</span>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 mb-2"><span className="small text-gray">2 Star</span>
                                                    <div className="progress w-75" style={{ height: 10 }}>
                                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '6%' }} aria-valuenow={6} aria-valuemin={0} aria-valuemax={100} />
                                                    </div><span className="text-gray">6%</span>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 mb-2"><span className="small text-gray">1 Star</span>
                                                    <div className="progress w-75" style={{ height: 10 }}>
                                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '10%' }} aria-valuenow={10} aria-valuemin={0} aria-valuemax={100} />
                                                    </div><span className="text-gray">10%</span>
                                                </div>
                                            </div>
                                            <h4 className="mt-4 mb-1">Add a review</h4>
                                            <p className="mb-3 small text-muted">Your email address will not be published. Required fields are marked *</p>
                                            <div className="review-form mt-3">
                                                <textarea className="form-control mt-3 mb-2" id="review" rows={5} name="text" defaultValue={""} />
                                                
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <button className="px-4 rounded-0 btn btn-primary" type="submit">Review</button>
                                                    <div className="user-rate ">
                                                        <input type="radio" name="rate" defaultValue={5} />
                                                        <input type="radio" name="rate" defaultValue={4} />
                                                        <input type="radio" name="rate" defaultValue={3} />
                                                        <input type="radio" name="rate" defaultValue={2} />
                                                        <input type="radio" name="rate" defaultValue={1} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-7">
                                            <div className="d-flex align-items-start gap-3 pt-4 border-bottom border-silver"><img className="img-fluid" src="https://i.pravatar.cc/60/avater1" alt />
                                                <div>
                                                    <div className="smaller text-silver-lead"><i className="smaller text-warning fa-solid fa-star" /><i className="smaller text-warning fa-solid fa-star" /><i className="smaller text-warning fa-solid fa-star" /><i className="smaller text-warning fa-solid fa-star" /><i className="smaller fa-solid fa-star" /></div>
                                                    <p className="small text-gray">
                                                        by<span className="mx-1 fw-bold text-dark">John Doe</span>on<span className="mx-1 fw-bold text-dark">Nov 10,2023</span></p>
                                                    <p className="mt-2 small text-muted">This review is for the Samsung Tab S6 Lite, 64gb wifi in blue. purchased this product performed.</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-start gap-3 py-4 border-bottom border-silver"><img className="img-fluid" src="https://i.pravatar.cc/60/avater2" alt />
                                                <div>
                                                    <div className="smaller text-silver-lead"><i className="smaller text-warning fa-solid fa-star" /><i className="smaller text-warning fa-solid fa-star" /><i className="smaller fa-solid fa-star" /><i className="smaller fa-solid fa-star" /><i className="smaller fa-solid fa-star" /></div>
                                                    <p className="small text-gray">
                                                        by<span className="mx-1 fw-bold text-dark">John Doe</span>on<span className="mx-1 fw-bold text-dark">Oct 20,2023</span></p>
                                                    <p className="mt-2 small text-muted">This review is for the Samsung Tab S6 Lite, 64gb wifi in blue. purchased this product performed.</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-start gap-3 py-4"><img className="img-fluid" src="https://i.pravatar.cc/60/avater3" alt />
                                                <div>
                                                    <div className="smaller text-silver-lead"><i className="smaller text-warning fa-solid fa-star" /><i className="smaller text-warning fa-solid fa-star" /><i className="smaller text-warning fa-solid fa-star" /><i className="smaller fa-solid fa-star" /><i className="smaller fa-solid fa-star" /></div>
                                                    <p className="small text-gray">
                                                        by<span className="mx-1 fw-bold text-dark">John Doe</span>on<span className="mx-1 fw-bold text-dark">Oct 20,2023</span></p>
                                                    <p className="mt-2 small text-muted">This review is for the Samsung Tab S6 Lite, 64gb wifi in blue. purchased this product performed.</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            <Footer />
        </div >
    )
}