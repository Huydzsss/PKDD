import React from "react";
import '../style.css';
import { NavLink } from "react-router-dom";


export default function Fitller(){
    return(
        <div >
            <div className="row">
            <div className="col-lg-3"> 
  <aside className="widget">
    <div className="mt-4 filter d-flex align-items-center justify-content-between after:bottom-border-50 border-bottom border-silver"><span className="fw-bold">Filter:</span><a className="small text-dark" href="#">Clear All </a></div>
    <div className="mt-4">
      <div className="mb-3 border-bottom">
        <h6 className="mb-3 fw-bold d-flex align-items-center justify-content-between border-bottom-"><span>Categories</span></h6>
        <ul> 
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="category-0" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="category-0">Computer &amp; Laptop<span className="text-gray ms-1">(25)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="category-1" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="category-1">Smart Watch<span className="text-gray ms-1">(30)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="category-2" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="category-2">Airpods<span className="text-gray ms-1">(45)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="category-3" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="category-3">Televisions<span className="text-gray ms-1">(35)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="category-4" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="category-4">Console Games<span className="text-gray ms-1">(45)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="category-5" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="category-5">Camers<span className="text-gray ms-1">(55)</span></label>
            </div>
          </li>
        </ul>
      </div>
      <div className="mb-3 border-bottom">
        <h6 className="mb-3 fw-bold d-flex align-items-center justify-content-between border-bottom-"><span>Brands</span></h6>
        <ul> 
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="brand-0" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="brand-0">Apple<span className="text-gray ms-1">(13)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="brand-1" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="brand-1">Gionee<span className="text-gray ms-1">(24)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="brand-2" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="brand-2">HTC<span className="text-gray ms-1">(19)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="brand-3" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="brand-3">LG<span className="text-gray ms-1">(32)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="brand-4" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="brand-4">Micromax<span className="text-gray ms-1">(20)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="brand-5" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="brand-5">Samsung<span className="text-gray ms-1">(52)</span></label>
            </div>
          </li>
        </ul>
      </div>
      <div className="mb-3 border-bottom">
        <h6 className="mb-3 fw-bold d-flex align-items-center justify-content-between border-bottom-"><span>Colors</span></h6>
        <ul> 
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="color-0" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="color-0">Black<span className="text-gray ms-1">(25)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="color-1" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="color-1">Blue<span className="text-gray ms-1">(31)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="color-2" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="color-2">Brown<span className="text-gray ms-1">(10)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="color-3" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="color-3">Green<span className="text-gray ms-1">(42)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="color-4" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="color-4">Gray<span className="text-gray ms-1">(21)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="color-5" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="color-5">Orange<span className="text-gray ms-1">(12)</span></label>
            </div>
          </li>
          <li>
            <div className="form-check mb-3 small">
              <input className="form-check-input rounded-0 border-silver" id="color-6" type="checkbox" defaultValue />
              <label className="form-check-label text-dark" htmlFor="color-6">Yellow<span className="text-gray ms-1">(6)</span></label>
            </div>
          </li>
        </ul>
      </div>
      <div className="mt-3"> 
        <h6 className="mb-3 fw-bold d-flex align-items-center justify-content-between border-bottom-"><span>Filter by Price</span></h6>
        <div id="price-slider" />
        <div className="small mt-3"><span className="fw-bold me-1">Price:</span><span id="slider-non-linear-step-value" /></div>
      </div>
      
    </div>
  </aside>
</div>

            </div>

        </div>
    )
}