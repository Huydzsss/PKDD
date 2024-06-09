import React from "react";
import '../style.css';
import { NavLink } from "react-router-dom";
import Home from "../Home/Home";

export default function Background_shop(){
    return(
        <div>
            <div className="py-5 bg-image-center text-white text-center bg-light" style={{backgroundImage: 'url(assets/images/banners/banner-01.jpg)'}}>
  <div className="container py-3">
    <h4 className="mb-3 text-uppercase fw-bold">Categories </h4>
    <h2 className="mb-3 fw-bold text-uppercase">SHOP</h2>
    <ol className="breadcrumb breadcrump-light d-flex justify-content-center m-0">
      <li className="breadcrumb-item"><NavLink className="text-white" to="/"><i className="bi bi-house-door"> </i>Home</NavLink></li>
      <li className="breadcrumb-item text-light active" aria-current="page">Shop</li>
    </ol>
    
  </div>
</div>

        </div>
    )
}