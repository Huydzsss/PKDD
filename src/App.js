import React, { useCallback, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Component/Home/Home';
import Shop from './Component/Shop/Shop';
import Contact from './Component/ContactUs/Contact';
import Product_detail from './Component/Home/Product_detail';
import { CompareProvider } from './Component/Home/CompareContext';
import ComparePage from './Component/Home/ComparePage';
import My_account from './Component/Login/My_account';
import Login_Register from './Component/Login/Login_Resgister';
import Cart from './Component/Home/Cart';
import PayPalSuccess from "./Component/Payment/PayPalSuccess";
import SortBattery from "./Component/Shop/SortBattery";
import Cables from "./Component/Shop/Cables";
import SortHeadphones from "./Component/Shop/SortHeadphones";
import SortSmartPhone from "./Component/Shop/SortSmartPhone";
import SortScreen from "./Component/Shop/SortScreen";
import SortPhoneCase from "./Component/Shop/SortPhoneCase";
import Samsung from "./Component/Shop/SamSung";
import Xiaomi from "./Component/Shop/Xiaomi";
import Apple from "./Component/Shop/Apple";
import Huawei from "./Component/Shop/Huawei";
import Oppo from "./Component/Shop/Oppo";
import Nokia from "./Component/Shop/Nokia";
import SortHPhone from "./Component/Shop/SortHPhone";

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
            <Route path="/My_account" element={<My_account />} />
            <Route path="/Login_Register" element={<Login_Register />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/SortBattery" element={<SortBattery />} />
            <Route path="/Cables" element={<Cables />} />
            <Route path="/SortHeadphones" element={<SortHeadphones />} />
            <Route path="/SortSmartPhone" element={<SortSmartPhone />} />
            <Route path="/SortScreen" element={<SortScreen />} />
            <Route path="/SortPhoneCase" element={<SortPhoneCase />} />
            <Route path="/Samsung" element={<Samsung />} />
            <Route path="/Xiaomi" element={<Xiaomi />} />
            <Route path="/Apple" element={<Apple />} />
            <Route path="/Huawei" element={<Huawei />} />
            <Route path="/Oppo" element={<Oppo />} />
            <Route path="/Nokia" element={<Nokia />} />
            <Route path="/SortHPhone" element={<SortHPhone />} />
            <Route path="/PayPalSuccess" element={<PayPalSuccess />} />
            
          </Routes>
        </Router>
      </CompareProvider>
    </div>
  );
}

export default App;
