import React, { useState, useContext, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Modal.css';
import { CompareContext } from './CompareContext';
import Product_detail from "./Product_detail";
import axios from "axios";


export default function Best_product() {
  const [cart, setCart] = useState([]);
  const { compareProducts, addProductToCompare } = useContext(CompareContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState("All");
  const [zoomImage, setZoomImage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3010/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);
  

const addToCart = (productId) => {
  axios.post('http://localhost:3010/products/shopping_cart', { productId })
    .then(response => {
      console.log('Product added to cart:', response.data);
    })
    .catch(error => {
      console.error('Error adding product to cart:', error);
    });
};



  const filterProducts = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handleZoom = (imageSrc) => {
    setZoomImage(imageSrc);
  };

  const closeModal = () => {
    setZoomImage(null);
  };

  return (
    <div>
      <div>
        <div className="py-5 bg-light">
          <div className="container">
            <div className="row">
              <h4 className="text-center mb-4">
                <span className="px-2 position-relative">Best Products</span>
              </h4>
              <ul className="nav nav-pills gap-4 justify-content-center nav-bg-white-title mb-4">
                <li className="nav-item">
                  <a
                    className={`nav-link shadow-sm ${activeCategory === "All" ? "active" : ""}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      filterProducts("All");
                    }}
                  >
                    All
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link shadow-sm ${activeCategory === "Earphone" ? "active" : ""}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      filterProducts("Earphone");
                    }}
                  >
                    Earphone
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link shadow-sm ${activeCategory === "SmartWatchs" ? "active" : ""}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      filterProducts("SmartWatchs");
                    }}
                  >
                    SmartWatchs
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link shadow-sm ${activeCategory === "SmartPhone" ? "active" : ""}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      filterProducts("SmartPhone");
                    }}
                  >
                    SmartPhone
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link shadow-sm ${activeCategory === "Battery" ? "active" : ""}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      filterProducts("Battery");
                    }}
                  >
                    Battery
                  </a>
                </li>
              </ul>
              <div className="row m-0">
                {filteredProducts.map((product) => (
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
                          onClick={() => addToCart(product.id)} 
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
                        <div className="smaller mb-2 text-silver-lead">
                          {Array.from({ length: 5 }, (_, index) => (
                            <i key={index} className={`bi bi-star-fill ${index < product.rating ? "text-warning" : ""}`} />
                          ))}
                        </div>
                        <div>
                          <span className="price-18px text-primary fw-bold">${product.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {zoomImage && (
        <div className="modal vw-100" onClick={closeModal}>
          <img className="modal-content" src={zoomImage} alt="Zoomed" />
          <span className="close" onClick={closeModal}>&times;</span>
        </div>
      )}
    </div>
  );
}
