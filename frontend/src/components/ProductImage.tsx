import { useState } from "react";
import { Product } from "../types/Product";

const ProductImage = ({ product }: { product: Product }) => {
    const [currentImage, setCurrentImage] = useState<number>(0);

    const changeDisplayedImage = () => {
        if (product !== undefined && currentImage < product.images.length - 1) {
            setCurrentImage(currentImage + 1);
        } else {
            setCurrentImage(0);
        }
    };

    return (
        <div className="col-10 mx-auto col-md-6 col-lg-6 my-3 product-page-image">
            <img
                src={product.images[currentImage]}
                alt="product"
                onClick={() => changeDisplayedImage()}
            ></img>
        </div>
    );
};

export default ProductImage;
