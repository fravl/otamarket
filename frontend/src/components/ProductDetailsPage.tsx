import React, { useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import ProductOutletContext from "./Contexts/ProductOutletContext";
import ProductBuyerDetails from "./ProductBuyerDetails"
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductSellerDetails from "./ProductSellerDetails";
import Button from "react-bootstrap/Button";

const ProductDetailsPage = () => {
    const { id } = useParams();
    const products = useOutletContext<ProductOutletContext>().products;
    const [claimStatus, setClaimStatus] = useState<boolean>(false);
    const [sellerStatus, setSellerStatus] = useState<boolean>(false);

    const getProductById = (id: string | undefined) => {
        if (id !== undefined) {
            return products.find((product) => product.id == Number(id));
        } else {
            return undefined;
        }
    };

    const getAdditionalInfo = () => {
        if(sellerStatus){
           return <ProductBuyerDetails claimStatus={claimStatus} setClaimStatus={setClaimStatus}/>
        } else {
           return <ProductSellerDetails/>
        }
    }

    const product = getProductById(id);

    if (product === undefined) {
        return <div>Product does not exist</div>;
    } else {
        return (
            <div className="product-page">
                <Button variant="light" onClick={() => setSellerStatus(!sellerStatus)}>Toggle POV</Button>
                <div className="product-page-info-container">
                    <div className="row">
                        <ProductImage product={product}/>
                        <div className="col-10 mx-auto col-md-6 col-lg-6 my-3 product-page-info">
                            <ProductDetails product={product}/>
                            {getAdditionalInfo()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProductDetailsPage;
