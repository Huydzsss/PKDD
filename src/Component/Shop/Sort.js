import React, { useState, useEffect } from "react";
import '../style.css';
import { NavLink, useParams } from "react-router-dom";
import '../Home/Modal.css';
import axios from "axios";

export default function Sort() {
    const [zoomImage, setZoomImage] = useState(null);
    const { Category } = useParams();
    const [sortOption, setSortOption] = useState('default');
    const [productsToShow, setProductsToShow] = useState(12);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ name: '' });
    const [searchQuery, setSearchQuery] = useState(''); 
    const [isSearchVisible, setIsSearchVisible] = useState(false); 

    useEffect(() => {
        axios.get(`http://localhost:3010/products?category=${Category}`)
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, [Category]);

    const handleZoom = (imageSrc) => setZoomImage(imageSrc);
    const closeModal = () => setZoomImage(null);

    const handleSortChange = (e) => setSortOption(e.target.value);
    const handleProductsToShowChange = (e) => setProductsToShow(parseInt(e.target.value, 10));

    const handleFilterChange = (e) => {
        const { value } = e.target;
        setSearchQuery(value); 
    };

    const handleSubmitFilter = (e) => {
        e.preventDefault(); 
        setFilters({ ...filters, name: searchQuery }); 
        setCurrentPage(1); 
    };

    const toggleSearchBar = () => {
        setIsSearchVisible(!isSearchVisible); 
    };

    const filterProducts = (products, filters) => {
        return products.filter(product =>
            product.name.toLowerCase().includes(filters.name.toLowerCase())
        );
    };

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

    const filteredProducts = filterProducts(products, filters);
    const sortedProducts = sortProducts(filteredProducts, sortOption);
    const totalPages = Math.ceil(sortedProducts.length / productsToShow);
    const displayedProducts = sortedProducts.slice((currentPage - 1) * productsToShow, currentPage * productsToShow);

    return (
        <div className="container-fluid">
            <div className="my-4 d-flex flex-wrap flex-md-nowrap justify-content-between bg-light p-3 shadow-sm small rounded-1 ">
                <div className="d-flex gap-3 align-items-center mb-2 mb-md-0">
                    <label className="fw-bold small text-uppercase m-auto" htmlFor="sort">Sort By:</label>
                    <select className="w-50 form-select form-select-sm border-silver rounded-0" id="sort" value={sortOption} onChange={handleSortChange}>
                        <option value="default">Default</option>
                        <option value="most-popular">Most Popular</option>
                        <option value="average-rating">Average rating</option>
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
                    <form className="border input-group mx-auto w-50 " onSubmit={handleSubmitFilter}>
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
            <div className="row">
                {displayedProducts.map(product => (
                    <div className="col-lg-3 col-md-4" key={product.id}>
                        <div className="card product-card bg-transparent border-0 mb-3">
                            <div className="card-header position-relative shadow-sm border-0 p-0">
                                <NavLink className="thumb-right" to={`/Product_detail/${product.id}`} onClick={() => window.scrollTo(0, 0)}>
                                    {product.image1 && (
                                        <>
                                            <img className="default-image w-100 product-image-container" src={product.image1} alt=""  style={{border:'1px'}}/>
                                            {product.image2 && (
                                                <img className="hover-image w-100 product-image-container" src={product.image2} alt="" style={{border:'1px'}}/>)}
                                        </>
                                    )}
                                </NavLink>
                                <ul className="card-btn-group text-dark-lead top-left-10">
                                    <li>
                                        <NavLink className="icon-sm rounded-1 bg-white shadow-sm mb-1" to="#" onClick={() => handleZoom(product.image1)}>
                                            <i className="bi bi-zoom-in" />
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="icon-sm rounded-1 bg-white shadow-sm mb-1" to="#">
                                            <i className="bi bi-arrow-left-right" />
                                        </NavLink>
                                    </li>
                                </ul>
                                <NavLink className="w-75 position-absolute bottom-center-10 rounded-0 btn btn-sm btn-primary" to="#">
                                    <i className="bi bi-basket me-2" />Add To Cart
                                </NavLink>
                            </div>
                            <div className="card-body text-center pt-2 px-0">
                                <h6 className="mb-1 title-max-45 fw-bold">
                                    <NavLink className="text-dark" to={`/Product_detail/${product.id}`}>{product.name}</NavLink>
                                </h6>
                                <div className="smaller mb-2 text-silver-lead">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <i key={index} className={`bi bi-star-fill ${index < product.rating ? 'text-warning' : ''}`} />
                                    ))}
                                </div>
                                <div>
                                    {product.oldPrice && <span className="text-secondary text-decoration-line-through me-1">${product.oldPrice}</span>}
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
            {zoomImage && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"></h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <img src={zoomImage} alt="Zoomed" className="w-100" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
