import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import '../style.css';

export default function ProductsByCategory() {
    const { category } = useParams();
    const [pkdd, setPkdd] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3010/pkdd/products')
            .then(response => {
                setPkdd(response.data);
            })
            .catch(error => {
                console.error('Error fetching pkdd:', error);
            });
    }, []);

    useEffect(() => {
        const filtered = pkdd.filter(product => product.category === category);
        setFilteredProducts(filtered);
    }, [pkdd, category]);

    return (
        <div className="container">
            <h2>Products in {category}</h2>
            <div className="row">
                {filteredProducts.map(product => (
                    <div key={product.id} className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <img src={product.image1} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">${product.price}</p>
                                <NavLink to={`/Product_detail/${product.id}`} className="btn btn-primary">
                                    View Details
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
