import { Item, ItemImageType } from "../types";
import Carousel from "react-bootstrap/Carousel";
import { CarouselItem } from "react-bootstrap";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const ItemImage = ({ item }: { item: Item }) => {
    const getSingleImage = (img: ItemImageType) => {
        var imgsrc = baseUrl + item.thumbnail;
        return <img alt="item" src={imgsrc} />;
    };

    const getImages = () => {
        return item.images.map((img) => (
            <CarouselItem>{getSingleImage(img)}</CarouselItem>
        ));
    };

    if (item.images.length > 1) {
        return (
            <Carousel className="col-10 mx-auto col-md-6 col-lg-6 my-3 item-page-image">
                {getImages()}
            </Carousel>
        );
    } else if (item.images.length === 0) {
        return (
            <div className="col-10 mx-auto col-md-6 col-lg-6 my-3 item-page-image">
                <img
                    alt="item"
                    src="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                />
            </div>
        );
    } else {
        return (
            <div className="col-10 mx-auto col-md-6 col-lg-6 my-3 item-page-image">
                {getSingleImage(item.images[0])}
            </div>
        );
    }
};

export default ItemImage;
