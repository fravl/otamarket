import React from "react";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
    const queueSize = Math.random() < 0.7 ? 0 : 1;
    return (
        <React.Fragment>
            <div className="col-10 mx-auto mx-lg-0 col-md-6 col-lg-3 my-3">
                <Link className="product-card-navlink" to={`/${product.id}`}>
                    <div className="product-card">
                        <div>
                            <img
                                className="product-card-image"
                                alt="productimg"
                                src={product.images[0]}
                            />
                            <span
                                className={`product-card-badge badge ${
                                    queueSize === 0
                                        ? "bg-success"
                                        : "bg-warning"
                                }`}
                            >
                                {queueSize} in queue
                            </span>
                            {/* <span className={`"badge ${product.queueSize === 0 ? 'bg-success' : 'bg-warning' }"`}>{product.queueSize} in queue</span> */}
                        </div>
                        <div className="product-card-text-container">
                            <div className="product-card-product-pricecontainer">
                                <div>
                                    <span className="product-card-product-price">{`${product.price} €`}</span>
                                    <span className="product-card-product-name">
                                        {product.title}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </React.Fragment>
    );
};

export default ProductCard;
