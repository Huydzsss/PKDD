import React, { useContext, useState, useEffect } from 'react';
import { CompareContext } from './CompareContext';
import './Modal.css';
import Menu from './Menu';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
export default function ComparePage() {
  const { compareProducts, clearCompareProducts } = useContext(CompareContext);
  const [cart, setCart] = useState([]);
  const [pkdd, setPkdd] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("SmartPhone");
  const [zoomImage, setZoomImage] = useState(null);
  const [userCustomerId, setUserCustomerId] = useState(null); // Mã người dùng đăng nhập
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3010/pkdd/products')
      .then(response => {
        setPkdd(response.data);
        setFilteredProducts(response.data.filter(product => product.category === "SmartPhone"));
      })
      .catch(error => {
        console.error('Error fetching pkdd:', error);
      });

    setUserCustomerId(1); // Đặt mã khách hàng tại đây
  }, []);

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

  const handleZoom = (imageSrc) => {
    setZoomImage(imageSrc);
  };

  const closeModal = () => {
    setZoomImage(null);
  };
  return (
    <div>
      <Menu />
      <div>
        <nav className="bg-light py-3" aria-label="breadcrumb">
          <div className="container">
            <ol className="breadcrumb breadcrump-light d-flex justify-content-center m-0">
              <li className="breadcrumb-item small">
                <NavLink className="text-dark" to="/">
                  <i className="bi bi-house-door"></i> Home
                </NavLink>
              </li>
              <li className="breadcrumb-item small active" aria-current="page">
                Compare
              </li>
            </ol>
          </div>
        </nav>
        <div className="container pb-5">
          <div className="row overflow-x-scroll py-3">
            <div className="row flex-nowrap">
              <div className="col-2 d-flex justify-content-center align-items-center border-bottom py-3">
                <p className="text-gray small fw-bold">Preview </p>
              </div>
              {compareProducts.map((product, index) => (
                <div key={index} className="col-md-4 col-6 border-bottom py-3">
                  <div className="card product-card rounded-0 border-0 mt-3">
                    <div className="card-header position-relative border-0 p-0">
                      <NavLink className="thumb-right" to={`/product/${product.id}`}>
                        <img className="default-image w-auto product-image-container" src={product.image1} />
                      </NavLink>
                      <ul className="card-btn-group text-dark-lead top-left-10">
                        <li>
                          <a className="icon-sm rounded-1 bg-white shadow-sm mb-1" href="#">
                            <i className="bi bi-heart"></i>
                          </a>
                        </li>
                        <li>
                          <a className="icon-sm rounded-1 bg-white shadow-sm mb-1" href="#">
                            <i className="bi bi-zoom-in"></i>
                          </a>
                        </li>
                        <li>
                          <a className="icon-sm rounded-1 bg-white shadow-sm mb-1" href="#">
                            <i className="bi bi-arrow-left-right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row flex-nowrap">
              <div className="col-2 d-flex justify-content-center align-items-center border-bottom py-3">
                <p className="text-gray small fw-bold">Title </p>
              </div>
              {compareProducts.map((product, index) => (
                <div key={index} className="col-md-4 col-6 text-center border-bottom py-3">
                  <h6 className="mb-0">{product.name}</h6>
                </div>
              ))}
            </div>
            <div className="row flex-nowrap">
              <div className="col-2 d-flex justify-content-center align-items-center border-bottom py-3">
                <p className="text-gray small fw-bold">Description </p>
              </div>
              {compareProducts.map((product, index) => (
                <div key={index} className="col-md-4 col-6 text-center border-bottom py-3">
                  <p className="small text-gray mb-0">{product.description}</p>
                </div>
              ))}
            </div>
            <div className="row flex-nowrap">
              <div className="col-2 d-flex justify-content-center align-items-center border-bottom py-3">
                <p className="text-gray small fw-bold">Price </p>
              </div>
              {compareProducts.map((product, index) => (
                <div key={index} className="col-md-4 col-6 text-center border-bottom py-3">
                  <h6 className="mb-0 text-primary fw-bold">${product.price}</h6>
                </div>
              ))}
            </div>
            <div className="row flex-nowrap">
              <div className="col-2 d-flex justify-content-center align-items-center border-bottom py-3">
                <p className="text-gray small fw-bold">Availability </p>
              </div>
              {compareProducts.map((product, index) => (
                <div key={index} className="col-md-4 col-6 text-center border-bottom py-3">
                  <h6 className="mb-0 text-success fw-bold">In stock</h6>
                </div>
              ))}
            </div>
            <div className="row flex-nowrap">
              <div className="col-2 d-flex justify-content-center align-items-center border-bottom py-3">
                <p className="text-gray small fw-bold">Rating </p>
              </div>
              {compareProducts.map((product, index) => (
                <div key={index} className="col-md-4 col-6 text-center border-bottom py-3 small">
                  <div className="small text-silver-lead">
                    {[...Array(product.rating)].map((star, i) => (
                      <i key={i} className="bi bi-star-fill text-warning"></i>
                    ))}
                    {[...Array(5 - product.rating)].map((star, i) => (
                      <i key={i} className="bi bi-star-fill"></i>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="row flex-nowrap">
              <div className="col-2 d-flex justify-content-center align-items-center border-bottom py-3">
                <p className="text-gray small fw-bold">Buy now </p>
              </div>
              {compareProducts.map((product, index) => (
                <div key={index} className="col-md-4 col-6 text-center border-bottom py-3 small">
                  <NavLink
                    className="rounded-0 px-4 btn btn-primary mx-1"

                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                    }}
                  >
                    <i className="bi bi-basket me-2"></i>Add To Cart
                  </NavLink>
                </div>
              ))}
            </div>
            <div className="row flex-nowrap">
              <div className="col-2 d-flex justify-content-center align-items-center border-bottom py-3">
                <p className="text-gray small fw-bold"> </p>
              </div>
              {compareProducts.map((product, index) => (
                <div key={index} className="col-md-4 col-6 text-center border-bottom py-3 small">
                  <a className="rounded-0 text-danger">
                    <i className="fa-solid fa-trash-can"></i>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <button className="btn btn-danger mt-4" onClick={clearCompareProducts}>
            Clear All
          </button>
        </div>
      </div>
      <Footer />
      <ToastContainer/>
    </div>
  );
}
