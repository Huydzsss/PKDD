import React, { createContext, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CompareContext = createContext();



export const CompareProvider = ({ children }) => {
  const [compareProducts, setCompareProducts] = useState([]);
  const [compareCount, setCompareCount] = useState(0);

  const addProductToCompare = (product) => {
    setCompareProducts((prevCompareProducts) => {
      if (prevCompareProducts.some((p) => p.id === product.id) || prevCompareProducts.length >= 2) {
        return prevCompareProducts;
      } else {
        setCompareCount((prevCount) => prevCount + 1);
        toast.success(`${product.name} has been added to comparison.`);
        return [...prevCompareProducts, product];
      }
    });
  };

  const removeProductFromCompare = (productId) => {
    setCompareProducts((prevCompareProducts) =>
      prevCompareProducts.filter((p) => p.id !== productId)
    );
  };

  const clearCompareProducts = () => {
    setCompareProducts([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareProducts,
        compareCount,
        addProductToCompare,
        removeProductFromCompare,
        clearCompareProducts,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export default CompareContext;
