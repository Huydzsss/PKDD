import React from "react";
import '../style.css';
import { NavLink } from "react-router-dom";

export default function Category() {
    const categories = [
        { icon: "bi-battery", label: "Battery", path: "/Category/Battery" },
        { icon: "bi-earbuds", label: "Earbuds", path: "/Category/Earbuds" },
        { icon: "bi-laptop", label: "Laptops", path: "/Category/Laptops" },
        { icon: "bi-phone", label: "Phones", path: "/Category/Phones" },
        { icon: "bi-smartwatch", label: "Smartwatch", path: "/Category/Smartwatch" }
    ];

    return (
        <div className="py-lg-1 py-3">
            <div className="">
                <div className="py-5">
                    <div className="">
                        <div className="carousel-slider-6-items carousel-arrow-hidden carousel-dots-hidden">
                            {categories.map((category) => (
                                <div className="item-slider" key={category.label}>
                                    <div className="text-center text-primary border py-4 rounded-1 border-silver">
                                        <i className={`display-5 bi ${category.icon}`}></i>
                                        <p className="mt-1">
                                            <NavLink to={category.path}>{category.label}</NavLink>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
