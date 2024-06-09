import React from "react";
import '../style.css';

export default function Sale_today() {
    return (
        <div classNameName="bg-dark py-lg-1 py-3">
            <div className="container">

                <div className="py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="center-image d-flex align-items-center rounded-1 p-5" style={{ backgroundImage: 'url(assets/images/banners/full-2.jpg)' }}>
                                    <div className="w-100 text-center text-white">
                                        <h2>Sale on This Friday</h2>
                                        <h1>25% OFF</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}