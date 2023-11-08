import { Item } from "../types";
import Carousel from "react-bootstrap/Carousel";
import { CarouselItem } from "react-bootstrap";

const ItemImage = ({ item }: { item: Item }) => {
    const getImages = () => {
        return item.images.map((img) => (
            <CarouselItem>
                <img src={img} alt="item"></img>
            </CarouselItem>
        ));
    };

    if (item.images.length > 1) {
        return (
            <Carousel className="col-10 mx-auto col-md-6 col-lg-6 my-3 item-page-image">
                {getImages()}
            </Carousel>
        );
    } else {
        return (
            <div className="col-10 mx-auto col-md-6 col-lg-6 my-3 item-page-image">
                <img src={item.images[0]} alt="item"></img>
            </div>
        );
    }
};

export default ItemImage;
