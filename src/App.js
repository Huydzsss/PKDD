import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Component/Home/Home';
import Shop from './Component/Shop/Shop';
import Contact from './Component/ContactUs/Contact';
import Product_detail from './Component/Home/Product_detail';
import { CompareProvider } from './Component/Home/CompareContext';
import ComparePage from './Component/Home/ComparePage';
import Login from './Component/Login/Login';
import Register from './Component/Login/Register';
import My_account from './Component/Login/My_account';
import Login_Register from './Component/Login/Login_Resgister';
import Sort from './Component/Shop/Sort';
import Category from './Component/Home/Category';

function App() {
  return (
    <div className="App">
        <CompareProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Shop" element={<Shop />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Product_detail/:productId" element={<Product_detail />} />
          <Route path="/Compare" element={<ComparePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/My_account" element={<My_account />} />
          <Route path="/Login_Register" element={<Login_Register />} />
        </Routes>
      </Router>
        </CompareProvider>
    </div>
  );
}

export default App;
