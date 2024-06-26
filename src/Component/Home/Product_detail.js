import React, { useState, useEffect } from "react";
import '../style.css';
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import Menu from "./Menu";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";

export default function Product_detail() {
    const { productId } = useParams();
    const parsedProductId = parseInt(productId);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3010/pkdd/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3010/pkdd/reviews/${parsedProductId}`)
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    }, [parsedProductId]);

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
    const addToCart = (product) => {

        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);

        // Nếu sản phẩm đã tồn tại trong giỏ hàng
        if (existingItemIndex !== -1) {
            // Gọi API để cập nhật số lượng sản phẩm trong giỏ hàng
            const updatedQuantity = cartItems[existingItemIndex].quantity + 1;

            axios.put(`http://localhost:3010/pkdd/shopping_cart/${product.id}`, {
                quantity: updatedQuantity
            })
                .then(response => {
                    toast.success('Product added to cart!');
                    console.log('Product added to cart:', response.data);
                })
                .catch(error => {
                    toast.error("Error adding product to cart");
                    console.error('Error adding product to cart:', error);
                });
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào
            axios.post('http://localhost:3010/pkdd/shopping_cart', {
                customers_id: 1, // Mã khách hàng thực tế
                product_id: product.id,
                quantity: 1
            })
                .then(response => {
                    toast.success('Product added to cart!');
                    console.log('Product added to cart:', response.data);
                })
                .catch(error => {
                    toast.error("Error adding product to cart");
                    console.error('Error adding product to cart:', error);
                });
        }
    };
    const handleSubmitReview = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3010/pkdd/reviews', {
            productId: parsedProductId,
            rating: selectedRating,
            text: reviewText,
            customerName: customerName,
            createdAt: new Date()
        })
            .then(response => {
                console.log("Đánh giá đã được gửi thành công!");
                setReviewText('');
                setSelectedRating(0);
                setCustomerName('');

                // Sau khi gửi đánh giá thành công, bạn có thể cập nhật lại danh sách reviews
                axios.get(`http://localhost:3010/pkdd/reviews/${parsedProductId}`)
                    .then(response => {
                        setReviews(response.data);
                    })
                    .catch(error => {
                        console.error('Lỗi khi lấy đánh giá cập nhật:', error);
                    });
            })
            .catch(error => {
                console.error('Lỗi khi gửi đánh giá:', error);
            });
    };

    const getImage = () => {
        if (!selectedProduct) return '';
        return selectedImageIndex === 0 ? selectedProduct.image1 : selectedProduct.image2;
    };

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;
        return averageRating.toFixed(1); 
    };

    return (
        <div className="text-start">
            <div className="py">
                <Menu />
                <div className="row">
                    {/* Breadcrumb */}
                    <div className="row">
                        <nav className="bg-light py-3 d-flex" aria-label="breadcrumb">
                            <div className="container">
                                <ol className="breadcrumb breadcrump-light d-flex justify-content-center m-0">
                                    <li className="breadcrumb-item small"><NavLink className="text-dark" to="/"><i className="bi bi-house-door"></i> Home</NavLink></li>
                                    <li className="breadcrumb-item small active" aria-current="page">Product detail</li>
                                </ol>
                            </div>
                        </nav>
                    </div>

                    {/* Product Images */}
                    <div className="col-lg-5">
                        <div className="carousel-horizontal-container">
                            <div className="single-product-carousel-horizontal border border-silver">
                                {selectedProduct && (
                                    <div className="slider-zoom">
                                        <img
                                            src={`${process.env.PUBLIC_URL}/${getImage()}`}
                                            alt=""
                                            className="img-fluid product-image-container"
                                            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="d-flex silder-horizontal-nav mt-2">
                                {selectedProduct && (
                                    <>

                                        {/* {selectedProduct.image1 && (
                                            <div className="slider-item border border-silver" onClick={() => handleImageClick(0)}>
                                                <img className="img-fluid" src={`${process.env.PUBLIC_URL}/${selectedProduct.image1}`} alt="Image 1" />
                                            </div>
                                        )}
                                        {selectedProduct.image2 && (
                                            <div className="slider-item border border-silver" onClick={() => handleImageClick(1)}>
                                                <img className="img-fluid" src={`${process.env.PUBLIC_URL}/${selectedProduct.image2}`} alt="Image 2" />
                                            </div>
                                        )} */}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="col-lg-7">
                        <div className="text-start">
                            {/* Category and Product Name */}
                            <NavLink className="d-block mb-1 text-muted small" to="#">{selectedProduct && selectedProduct.category}</NavLink>
                            <h4 className="mb-2">{selectedProduct && selectedProduct.name}</h4>

                            {/* Product Rating */}
                            <div className="d-flex align-items-center gap-2 small">
                                <div className="text-silver-lead">
                                    {[...Array(Math.floor(calculateAverageRating()))].map((_, index) => (
                                        <i key={index} className="bi bi-star-fill text-warning"></i>
                                    ))}
                                    {[...Array(5 - Math.floor(calculateAverageRating()))].map((_, index) => (
                                        <i key={index + 5} className="bi bi-star-fill"></i>
                                    ))}
                                </div>
                                <span className="text-gray">({reviews.length} customer reviews)</span>
                            </div>

                            <div className="mt-2">
                                {selectedProduct && selectedProduct.best_seller === 1 ? (
                                    <>
                                        <span className="fs-5 text-muted text-decoration-line-through me-2">${selectedProduct.price + 20}.00</span>
                                        <span className="fs-3 text-dark fw-bold">${selectedProduct.price}.00</span>
                                    </>
                                ) : (
                                    <span className="fs-3 text-dark fw-bold">${selectedProduct && selectedProduct.price}.00</span>
                                )}
                            </div>
                            {/* Product Information */}
                            <ul className="small list-unstyled">
                                <li className="mb-1"><span className="me-2 text-muted">Brand:</span><span className="text-dark fw-bold">{selectedProduct && selectedProduct.model}</span></li>
                                <li className="mb-1"><span className="me-2 text-muted">Category:</span><span className="text-dark fw-bold">{selectedProduct && selectedProduct.category}</span></li>
                                <li className="mb-1"><span className="me-2 text-muted">Tags:</span><NavLink className="text-dark fw-bold" to="#">{selectedProduct && selectedProduct.tags}</NavLink></li>
                            </ul>

                            {/* Quantity Selector and Buttons */}

                            <div className="d-flex align-items-center gap-2 mt-4" >
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

                                <button className="rounded-0 px-4 btn btn-primary mx-1" onClick={() => addToCart(selectedProduct)}>
                                    <i className="bi bi-basket me-2"></i>Add To Cart
                                </button>
                                <NavLink className="btn rounded-0 shadow-sm border" to="#"><i className="bi bi-arrow-left-right"></i></NavLink>
                            </div>




                            {/* Share Buttons */}
                            <div className="d-flex align-items-center mt-4">
                                <span className="me-2 text-muted">Share:</span>
                                <NavLink className="social-x-icon rounded-circle shadow-sm border me-2" to="#"><i className="bi bi-facebook"></i></NavLink>
                                <NavLink className="social-x-icon rounded-circle shadow-sm border me-2" to="#"><i className="bi bi-twitter"></i></NavLink>
                                <NavLink className="social-x-icon rounded-circle shadow-sm border me-2" to="#"><i className="fa-solid fa-envelope"></i></NavLink>
                            </div>

                            {/* Additional Product Info */}
                            <ul className="mt-3 list-unstyled">
                                <li className="mt-1 smaller"><i className="text-muted me-1 fa-regular fa-circle-check"></i><span className="text-secondary">30 days easy returns</span></li>
                                <li className="mt-1 smaller"><i className="text-muted me-1 fa-regular fa-circle-check"></i><span className="text-secondary">Order yours before 2.30pm for same day dispatch</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Product Description, Additional Info, Reviews */}
                <div className="py-4">
                    <div className="container">
                        <div className="row">
                            {/* Tab Navigation */}
                            <ul className="nav nav-pills justify-content-center text-dark-lead border-bottom">
                                <li className="nav-item">
                                    <a className="fs-5 px-4 rounded-0 hover:bottom-line nav-link active" id="description-tab" href="#" data-bs-toggle="tab" data-bs-target="#description" role="tab" aria-controls="description" aria-selected="true">Description</a>
                                </li>
                                <li className="nav-item">
                                    <a className="fs-5 px-4 rounded-0 hover:bottom-line nav-link" id="additional-info-tab" href="#" data-bs-toggle="tab" data-bs-target="#additional-info" role="tab" aria-controls="additional-info" aria-selected="false">Additional information</a>
                                </li>
                                <li className="nav-item">
                                    <a className="fs-5 px-4 rounded-0 hover:bottom-line nav-link" id="reviews-tab" href="#" data-bs-toggle="tab" data-bs-target="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews ({reviews.length})</a>
                                </li>
                            </ul>

                            {/* Tab Content */}
                            <div className="tab-content text-start">
                                {/* Description Tab */}
                                <div className="pt-4 tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
                                    <div className="mb-3">
                                        <h5>Introduction</h5>
                                        <p className="text-gray">{selectedProduct && selectedProduct.description}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h5>Features :</h5>
                                        <ul>
                                            <li className="mt-2 text-muted"><i className="small text-primary fa-solid fa-check me-2" />
                                                {selectedProduct && selectedProduct.featured}
                                            </li>
                                            <li className="mt-2 text-muted"><i className="small text-primary fa-solid fa-check me-2" /> {selectedProduct && selectedProduct.featured2}</li>
                                            <li className="mt-2 text-muted"><i className="small text-primary fa-solid fa-check me-2" /> {selectedProduct && selectedProduct.featured3}</li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Additional Info Tab */}
                                <div className="tab-pane pt-4" id="additional-info" role="tabpanel" aria-labelledby="additional-info-tab">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-9">
                                            <table className="table border border-silver">
                                                <tbody>
                                                    <tr>
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
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {/* Reviews Tab */}
                                <div className="tab-pane" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="pt-4 pb-1">
                                                {/* Average Rating */}
                                                <span className="me-2 fw-bold fs-1">{calculateAverageRating()}</span>
                                                <div className="d-inline-flex align-items-center">
                                                    <div className="smaller text-silver-lead">
                                                        {[...Array(Math.floor(calculateAverageRating()))].map((_, i) => (
                                                            <i key={i} className="text-warning fa-solid fa-star"></i>
                                                        ))}
                                                        {[...Array(5 - Math.floor(calculateAverageRating()))].map((_, i) => (
                                                            <i key={i + 5} className="fa-solid fa-star"></i>
                                                        ))}
                                                    </div>
                                                    <span className="ms-2 smaller text-gray">({reviews.length} customer reviews)</span>
                                                </div>
                                            </div>

                                            {/* Rating Distribution */}
                                            <div className="w-100 rating-progress-group">
                                                {[5, 4, 3, 2, 1].map((stars) => (
                                                    <div key={stars} className="d-flex align-items-center gap-2 mb-2">
                                                        <span className="small text-gray">{stars} Star</span>
                                                        <div className="progress w-75" style={{ height: '10px' }}>
                                                            <div
                                                                className="progress-bar bg-warning"
                                                                role="progressbar"
                                                                style={{
                                                                    width: `${(reviews.filter(review => review.rating === stars).length / reviews.length) * 100}%`
                                                                }}
                                                                aria-valuenow={(reviews.filter(review => review.rating === stars).length / reviews.length) * 100}
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            ></div>
                                                        </div>
                                                        <span className="text-gray">{Math.floor((reviews.filter(review => review.rating === stars).length / reviews.length) * 100)}%</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Add Review Form */}
                                            <h4 className="mt-4 mb-1">Add a review</h4>
                                            <div>
                                                <strong>{reviews.customerName}</strong>
                                                <p className="m-0">{reviews.text}</p>
                                            </div>
                                            <p className="mb-3 small text-muted">
                                                Your email address will not be published. Required fields are marked *
                                            </p>
                                            <div className="review-form mt-3">
                                                <form onSubmit={handleSubmitReview}>
                                                    <input
                                                        type="text"
                                                        className="form-control mb-2"
                                                        id="customerName"
                                                        name="customerName"
                                                        value={customerName}
                                                        onChange={(e) => setCustomerName(e.target.value)}
                                                        placeholder="Your Full Name"
                                                        required
                                                    />

                                                    <textarea
                                                        className="form-control mt-3 mb-2"
                                                        id="review"
                                                        rows={5}
                                                        name="text"
                                                        value={reviewText}
                                                        onChange={(e) => setReviewText(e.target.value)}
                                                        placeholder="Write your review here..."
                                                        required
                                                    />

                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <button className="px-4 rounded-0 btn btn-primary" type="submit">Review</button>

                                                        <input
                                                            type="radio"
                                                            id="rating-5"
                                                            name="rate"
                                                            value={5}
                                                            onChange={() => setSelectedRating(5)}
                                                            checked={selectedRating === 5}
                                                            className="visually-hidden"
                                                        />
                                                        <label htmlFor="rating-5" className="form-check-label mb-0">
                                                            <i className={`bi bi-star${selectedRating >= 5 ? '-fill text-warning' : ''}`}></i>
                                                        </label>

                                                        <input
                                                            type="radio"
                                                            id="rating-4"
                                                            name="rate"
                                                            value={4}
                                                            onChange={() => setSelectedRating(4)}
                                                            checked={selectedRating === 4}
                                                            className="visually-hidden"
                                                        />
                                                        <label htmlFor="rating-4" className="form-check-label mb-0">
                                                            <i className={`bi bi-star${selectedRating >= 4 ? '-fill text-warning' : ''}`}></i>
                                                        </label>

                                                        <input
                                                            type="radio"
                                                            id="rating-3"
                                                            name="rate"
                                                            value={3}
                                                            onChange={() => setSelectedRating(3)}
                                                            checked={selectedRating === 3}
                                                            className="visually-hidden"
                                                        />
                                                        <label htmlFor="rating-3" className="form-check-label mb-0">
                                                            <i className={`bi bi-star${selectedRating >= 3 ? '-fill text-warning' : ''}`}></i>
                                                        </label>

                                                        <input
                                                            type="radio"
                                                            id="rating-2"
                                                            name="rate"
                                                            value={2}
                                                            onChange={() => setSelectedRating(2)}
                                                            checked={selectedRating === 2}
                                                            className="visually-hidden"
                                                        />
                                                        <label htmlFor="rating-2" className="form-check-label mb-0">
                                                            <i className={`bi bi-star${selectedRating >= 2 ? '-fill text-warning' : ''}`}></i>
                                                        </label>

                                                        <input
                                                            type="radio"
                                                            id="rating-1"
                                                            name="rate"
                                                            value={1}
                                                            onChange={() => setSelectedRating(1)}
                                                            checked={selectedRating === 1}
                                                            className="visually-hidden"
                                                        />
                                                        <label htmlFor="rating-1" className="form-check-label mb-0">
                                                            <i className={`bi bi-star${selectedRating >= 1 ? '-fill text-warning' : ''}`}></i>
                                                        </label>
                                                    </div>





                                                </form>
                                            </div>
                                        </div>

                                        {/* Customer Reviews */}
                                        {/* Customer Reviews */}
                                        <div className="col-lg-7">
                                            <h4 className="mt-4 mb-1">Customer Reviews</h4>
                                            {reviews.map((review, index) => (
                                                <div key={index} className="d-flex align-items-start gap-3 py-4 border-bottom border-silver">
                                                    <div className="flex-grow-1">
                                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                                            <p className="text-small mb-0">{review.customerName}</p>
                                                            <div className="smaller text-silver-lead">
                                                                {[...Array(review.rating)].map((_, i) => (
                                                                    <i key={i} className="smaller text-warning bi bi-star-fill"></i>
                                                                ))}
                                                                {[...Array(5 - review.rating)].map((_, i) => (
                                                                    <i key={i + 5} className="smaller bi bi-star"></i>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="small text-gray">
                                                            by <span className="mx-1 fw-bold text-dark">{review.customerName}</span> on{' '}
                                                            <span className="mx-1 fw-bold text-dark">
                                                                {new Date(review.createdAt).toLocaleDateString()}
                                                            </span>
                                                        </p>
                                                        <p className="mt-2 small text-muted">{review.text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
                <ToastContainer />
            </div>
        </div>

    );
}
