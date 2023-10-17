import React, { useState } from "react";
import { Product } from "../types/Product";
import Button from "react-bootstrap/Button";
import { useParams, useOutletContext } from "react-router-dom";
import ProductOutletContext from "./Contexts/ProductOutletContext";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const products = useOutletContext<ProductOutletContext>().products;
    const [claimStatus, setClaimStatus] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<number>(0);

    const getProductById = (id: string | undefined) => {
        if (id !== undefined) {
            return products.find((product) => product.id == Number(id));
        } else {
            return undefined;
        }
    };

    const product = getProductById(id);

    const getClaimStatus = () => {
        if (claimStatus) {
            return "Unclaim";
        } else {
            return "Claim";
        }
    };

    const getContactInformation = () => {
        if (claimStatus) {
            return (
                <div className="product-page-contact-information">
                    <span>Contact Information</span>
                    <p>Tg: @testuser</p>
                    <p>Email: testuser@aalto.fi</p>
                </div>
            );
        } else {
            //return nothing
        }
    };

    const changeDisplayedImage = () => {
        if (product !== undefined && currentImage < product.images.length - 1) {
            setCurrentImage(currentImage + 1);
        } else {
            setCurrentImage(0);
        }
    };

    const claimButtonStyles = () => {
        if (claimStatus) {
            return "product-page-button red-button";
        } else {
            return "product-page-button";
        }
    };

    if (product === undefined) {
        return <div>Product does not exist</div>;
    } else {
        return (
            <div className="product-page">
                <div className="product-page-info-container">
                    <div className="row">
                        <div className="col-10 mx-auto col-md-6 col-lg-6 my-3 product-page-image">
                            <img
                                src={product.images[currentImage]}
                                alt="product"
                                onClick={() => changeDisplayedImage()}
                            ></img>
                        </div>
                        <div className="col-10 mx-auto col-md-6 col-lg-6 my-3 product-page-info">
                            <hr />
                            <h1 className="product-page-title">
                                {product.title}
                            </h1>
                            <hr />
                            <div className="product-page-description-container">
                                <h2>Product description</h2>
                                <p className="product-page-description">
                                    {product.description}
                                </p>
                            </div>
                            <span className="product-page-price">{`${product.price} €`}</span>
                            <hr />
                            {getContactInformation()}
                            <div className="product-page-button-container">
                                <Button
                                    type="submit"
                                    className={claimButtonStyles()}
                                    onClick={() => setClaimStatus(!claimStatus)}
                                >
                                    {getClaimStatus()}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProductDetailsPage;
