import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Modal.css';
import { CompareContext } from './CompareContext';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Hphone() {
  const { compareProducts, addProductToCompare } = useContext(CompareContext);
  const [pkdd, setPkdd] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("SmartPhone");
  const [zoomImage, setZoomImage] = useState(null);
  const [userCustomerId, setUserCustomerId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3010/pkdd/products')
      .then(response => {
        const sortedProducts = response.data.sort((a, b) => b.rating - a.rating);
        setPkdd(sortedProducts);
        setFilteredProducts(sortedProducts.filter(product => product.category === "High_end_phone"));
      })
      .catch(error => {
        console.error('Error fetching pkdd:', error);
      });

    setUserCustomerId(1);
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

  

  const handleSeeMoreClick = () => {
    navigate('/SortHPhone');
  };
  

  return (
    <div>
      <div>
        <div className="py-5 bg-light">
          <div className="container">
            <div className="row">
              <h4 className="text-center mb-4">
                <span className="px-2 position-relative fw-bolder fs-1">luxury phone</span>
              </h4>
              <ul className="nav nav-pills gap-4 justify-content-center nav-bg-white-title mb-4">
                <li className="nav-item">
                
                </li>
              </ul>
              <div className="row m-0">
                {filteredProducts.slice(0, 8).map((product) => (
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
                          <a className="text-dark" href="/Product_detail">
                            {product.name}
                          </a>
                        </h6>
                        
                        <div>
                          <span className="price-18px text-primary fw-bold">${product.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={handleSeeMoreClick}>See More</button>
              </div>
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
    </div>
  );
}
