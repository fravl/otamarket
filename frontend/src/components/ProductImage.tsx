import { Product } from "../types/Product";
import Carousel from "react-bootstrap/Carousel";
import { CarouselItem } from "react-bootstrap";

const ProductImage = ({ product }: { product: Product }) => {
    const getImages = () => {
        return product.images.map((img) => (
            <CarouselItem>
                <img src={img} alt="product"></img>
            </CarouselItem>
        ));
    };

    if (product.images.length > 1) {
        return (
            <Carousel className="col-10 mx-auto col-md-6 col-lg-6 my-3 product-page-image">
                {getImages()}
            </Carousel>
        );
    } else {
        return (
            <div className="col-10 mx-auto col-md-6 col-lg-6 my-3 product-page-image">
                <img src={product.images[0]} alt="product"></img>
            </div>
        );
    }
};

export default ProductImage;
