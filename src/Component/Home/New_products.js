import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import '../style.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CompareContext } from './CompareContext';

export default function New_products() {
    const { addProductToCompare } = useContext(CompareContext);
    const [newProducts, setNewProducts] = useState([]);
    const [zoomImage, setZoomImage] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3010/products/new_products')
            .then(response => {
                setNewProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleZoom = (imageSrc) => {
        setZoomImage(imageSrc);
    };

    const closeModal = () => {
        setZoomImage(null);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div>
            <div className="py-5 bg-light">
                <div className="container">
                    <h4 className="text-start border-bottom pb-2 mb-4">
                        <span className="px-2 position-relative">New Products</span>
                    </h4>
                    <Slider {...settings}>
                        {newProducts.map(product => (
                            <div className="item-slider " key={product.id}>
                                <div className="card product-card bg-transparent border-0 px-3">
                                    <div className="card-header position-relative shadow-sm border-0 p-0">
                                        <NavLink className="thumb-right" to={`/Product_detail/${product.id}`} onClick={() => window.scrollTo(0, 0)}>
                                            <img className="product-image-container" src={product.image1} alt={product.name} />
                                            {product.image2 && <img className="product-image-container" src={product.image2} alt={product.name} />}
                                        </NavLink>
                                        <ul className="card-btn-group text-dark-lead top-left-10">
                                            <li>
                                                <a className="icon-sm rounded-1 bg-white shadow-sm mb-1" onClick={() => handleZoom(product.image1)}>
                                                    <i className="bi bi-zoom-in" />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="icon-sm rounded-1 bg-white shadow-sm mb-1"
                                                    onClick={() => addProductToCompare(product)}
                                                >
                                                    <i className="bi bi-arrow-left-right" />
                                                </a>
                                            </li>
                                        </ul>
                                        <button className="w-75 position-absolute bottom-center-10 rounded-0 btn btn-sm btn-primary">
                                            <i className="bi bi-basket me-2" />Add To Cart
                                        </button>
                                    </div>
                                    <div className="card-body text-center pt-2 px-0">
                                        <h6 className="mb-1 title-max-45 fw-bold">
                                            <NavLink className="text-dark" to={`/Product_detail/${product.id}`}>{product.name}</NavLink>
                                        </h6>
                                        <div className="smaller mb-2 text-silver-lead">
                                            {Array.from({ length: product.rating }).map((_, index) => (
                                                <i key={index} className="bi bi-star-fill text-warning" />
                                            ))}
                                        </div>
                                        <div>
                                            <span className="price-18px text-primary fw-bold">${product.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            {zoomImage && (
                <div className="modal" onClick={closeModal}>
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img className="modal-content" src={zoomImage} alt="Zoomed" />
                </div>
            )}
        </div>
    );
}
