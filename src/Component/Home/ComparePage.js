import React, { useContext } from 'react';
import { CompareContext } from './CompareContext';
import './Modal.css';
import Menu from './Menu';
import Footer from './Footer';
import { NavLink } from 'react-router-dom';

export default function ComparePage () {
  const { compareProducts, clearCompareProducts } = useContext(CompareContext);

  return (
    <div>
      <Menu/>
      <h4 className="text-center mb-4">Compare Products</h4>
      {compareProducts.length === 0 ? (
        <p className="text-center">No products to compare.</p>
      ) : (
        <div className="compare-products d-flex justify-content-around">
          {compareProducts.map((product) => (
            <div key={product.id} className="compare-product">
              <NavLink to={`/Product_detail/${product.id}`}>
                <img src={product.image1} style={{ height: "300px", width: "337px" }} alt={product.name} />
              </NavLink>
              <h6>{product.name}</h6>
              <span>${product.price}</span>
            </div>
          ))}
        </div>
      )}
      {compareProducts.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-danger" onClick={clearCompareProducts}>
            Clear Comparison
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}
