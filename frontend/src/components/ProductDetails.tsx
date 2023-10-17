import { Product } from "../types/Product";

const ProductDetails = ({ product }: { product: Product }) => {
    return (
        <>
            <hr />
            <h1 className="product-page-title">{product.title}</h1>
            <hr />
            <div className="product-page-description-container">
                <h2>Product description</h2>
                <p className="product-page-description">
                    {product.description}
                </p>
            </div>
            <span className="product-page-price">{`${product.price} €`}</span>
            <hr />
        </>
    );
};

export default ProductDetails;
