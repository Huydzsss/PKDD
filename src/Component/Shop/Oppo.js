import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Home/Modal.css';
import { CompareContext } from "../Home/CompareContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Menu from "../Home/Menu";
import Background_shop from "./Background_shop";
import Footer from "../Home/Footer";

export default function Oppo() {
    const { addProductToCompare } = useContext(CompareContext);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [zoomImage, setZoomImage] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [sortOption, setSortOption] = useState('default');
    const [productsToShow, setProductsToShow] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({ name: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [selectedModel, setSelectedModel] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3010/pkdd/products')
            .then(response => {
                const sortedProducts = response.data.sort((a, b) => b.rating - a.rating);
                setProducts(sortedProducts);
                setFilteredProducts(sortedProducts.filter(product => product.model === "Oppo" && product.category === "SmartPhone"));
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const addToCart = (product) => {
        const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);

        if (existingItemIndex !== -1) {
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
            axios.post('http://localhost:3010/pkdd/shopping_cart', {
                customers_id: 1,
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

    const handleZoom = (imageSrc) => {
        setZoomImage(imageSrc);
    };

    const closeModal = () => {
        setZoomImage(null);
    };

    const handleProductsToShowChange = (e) => setProductsToShow(parseInt(e.target.value, 10));
    const toggleSearchBar = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const handleFilterChange = (e) => {
        const { value } = e.target;
        setSearchQuery(value);
    };

    const handleSubmitFilter = (e) => {
        e.preventDefault();
        setFilters({ ...filters, name: searchQuery });
        setCurrentPage(1);
    };

    const filterProducts = (products, filters) => {
        let filteredProducts = products;
        if (filters.name) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(filters.name.toLowerCase())
            );
        }
        return filteredProducts;
    };



    const handleSortChange = (e) => setSortOption(e.target.value);

    const sortProducts = (products, sortOption) => {
        switch (sortOption) {
            case 'most-popular':
                return products.slice().sort((a, b) => b.featured - a.featured);
            case 'average-rating':
                return products.slice().sort((a, b) => b.rating - a.rating);
            case 'latest':
                return products.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            case 'price-low-high':
                return products.slice().sort((a, b) => a.price - b.price);
            case 'price-high-low':
                return products.slice().sort((a, b) => b.price - a.price);
            default:
                return products;
        }
    };

    const filtered = filterProducts(filteredProducts, filters);
    const sortedProducts = sortProducts(filtered, sortOption);
    const totalPages = Math.ceil(sortedProducts.length / productsToShow);
    const displayedProducts = sortedProducts.slice((currentPage - 1) * productsToShow, currentPage * productsToShow);

    return (
        <div>
            <Menu />
            <Background_shop />
            <div>
                <div className="my-4 d-flex flex-wrap flex-md-nowrap justify-content-between bg-light p-3 shadow-sm small rounded-1">
                    <div className="d-flex gap-3 align-items-center mb-2 mb-md-0">
                        <label className="fw-bold small text-uppercase m-auto" htmlFor="sort">Sort By:</label>
                        <select className="w-50 form-select form-select-sm border-silver rounded-0" id="sort" value={sortOption} onChange={handleSortChange}>
                            <option value="default">Default</option>
                            <option value="most-popular">Most Popular</option>
                            <option value="average-rating">Average Rating</option>
                            <option value="latest">Latest</option>
                            <option value="price-low-high">Price: Low to High</option>
                            <option value="price-high-low">Price: High to Low</option>
                        </select>
                    </div>

                    <div className="d-flex gap-3 align-items-center">
                        <label className="fw-bold small text-uppercase m-auto" htmlFor="show">Show:</label>
                        <select className="p-1 w-75 form-select form-select-sm border-silver rounded-0" id="show" value={productsToShow} onChange={handleProductsToShowChange}>
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                            <option value={36}>36</option>
                            <option value={72}>72</option>
                        </select>
                        <NavLink className="m-0 fs-5 text-secondary" to="#"><i className="fa-solid fa-list" /></NavLink>
                        <NavLink className="m-0 fs-5 text-dark" to="#"><i className="bi bi-grid-fill" /></NavLink>
                        <button className="btn btn-light" onClick={toggleSearchBar}>
                            <i className="fa-solid fa-magnifying-glass fa-lg" />
                        </button>
                    </div>
                </div>

                {isSearchVisible && (
                    <div className="d-flex justify-content-between">
                        <form className="border input-group mx-auto w-50" onSubmit={handleSubmitFilter}>
                            <input
                                className="form-control border-0"
                                type="text"
                                placeholder="Search Your Product . . . . . ."
                                name="name"
                                value={searchQuery}
                                onChange={handleFilterChange}
                            />
                            <button className="btn btn" type="submit">
                                <i className="fa-solid fa-magnifying-glass fa-lg" />
                            </button>
                        </form>
                    </div>
                )}


                <div className="container">
                    <div className="row">
                        

                        <div className="row m-0">
                            {displayedProducts.map((product) => (
                                <div key={product.id} className="col-lg-3 col-md-4">
                                    <div className="card product-card bg-transparent border-0 mb-3">
                                        <div className="card-header position-relative shadow-sm border-0 p-0">
                                            <NavLink className="thumb-right" to={`/Product_detail/${product.id}`} onClick={() => window.scrollTo(0, 0)}>
                                                <img className="default-image w-100 product-image-container" src={product.image1} />
                                                {product.image2 && (
                                                    <img className="hover-image w-100 product-image-container" src={product.image2} />
                                                )}
                                            </NavLink>
                                            <ul className="card-btn-group text-dark-lead top-left-10">
                                                <li>
                                                    <a
                                                        className="icon-sm rounded-1 bg-white shadow-sm mb-1"
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleZoom(product.image1);
                                                        }}
                                                    >
                                                        <i className="bi bi-zoom-in" />
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        className="icon-sm rounded-1 bg-white shadow-sm mb-1"
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            addProductToCompare(product);
                                                        }}
                                                    >
                                                        <i className="bi bi-arrow-left-right" />
                                                    </a>
                                                </li>
                                            </ul>
                                            <NavLink
                                                to=""
                                                className="w-75 position-absolute bottom-center-10 rounded-0 btn btn-sm btn-primary"
                                                onClick={() => addToCart(product)}
                                            >
                                                <i className="bi bi-basket me-2" />Add Cart
                                            </NavLink>
                                        </div>
                                        <div className="card-body text-center pt-2 px-0">
                                            <h6 className="mb-1 title-max-45 fw-bold">
                                                <a className="text-dark" href={`/Product_detail/${product.id}`}>
                                                    {product.name}
                                                </a>
                                            </h6>
                                            <div className="smaller mb-2 text-silver-lead">

                                            </div>
                                            <div>
                                                <span className="price-18px text-primary fw-bold">${product.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-12">
                            <nav className="p-3 mt-2 mb-4 rounded-1 shadow-sm bg-light d-flex flex-wrap flex-md-nowrap align-items-center justify-content-between">
                                <p>Showing {Math.min(productsToShow, sortedProducts.length)} of {sortedProducts.length} Products</p>
                                <ul className="pagination lc-pagination gap-2">
                                    <li className="page-item">
                                        <NavLink className="page-link" to="#" aria-label="Previous" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
                                            <span aria-hidden="true">«</span>
                                        </NavLink>
                                    </li>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                                            <NavLink className="page-link" to="#" onClick={() => setCurrentPage(index + 1)}>
                                                {index + 1}
                                            </NavLink>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        <NavLink className="page-link" to="#" aria-label="Next" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}>
                                            <span aria-hidden="true">»</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            {zoomImage && (
                <div className="modal vw-100" onClick={closeModal}>
                    <img className="modal-content img-fluid w-auto h-90" src={zoomImage} alt="Zoomed" />
                    <span className="close" onClick={closeModal}>&times;</span>
                </div>
            )}
            <ToastContainer />
            <Footer />
        </div>
    );
}
