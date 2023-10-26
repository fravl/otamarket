import React from "react";
import { Item } from "../types/Item";
import ProductCard from "./ProductCard";
import { useOutletContext } from "react-router-dom";
import ProductOutletContext from "./Contexts/ProductOutletContext";

const ProductList = () => {
    const products = useOutletContext<ProductOutletContext>().products;

    return (
        <div className="products-list" id="products-list">
            <div className="container">
                <div className="row">
                    {products.map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
