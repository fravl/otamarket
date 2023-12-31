import { ItemSummary } from "../types";
import { Link } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const priceToString = (price: number) => {
    return price > 0 ? `${price}€` : "FREE";
};

const ItemCard = ({ item }: { item: ItemSummary }) => {
    function getThumbnail() {
        if (item.thumbnail === null || item.thumbnail.length === 0) {
            return <i className="bi bi-camera fs-1"></i>;
        } else {
            var imgsrc = baseUrl + item.thumbnail;

            return (
                <img
                    className="item-card-image"
                    alt="productimg"
                    src={imgsrc}
                />
            );
        }
    }

    return (
        <div className="col-10 mx-auto mx-lg-0 col-md-6 col-lg-3 my-3">
            <Link className="item-card-navlink" to={`/item/${item.id}`}>
                <div className="item-card">
                    <div>
                        <div className="item-card-image-container d-flex justify-content-center align-items-center">
                            {getThumbnail()}
                        </div>
                        <span
                            className={`item-card-badge badge ${
                                +item.claimCount === 0
                                    ? "bg-success"
                                    : "bg-warning"
                            }`}
                        >
                            {item.claimCount} in queue
                        </span>
                    </div>
                    <div className="item-card-text-container">
                        <div className="item-card-item-pricecontainer">
                            <div>
                                <span className="item-card-item-price">
                                    {priceToString(item.price)}
                                </span>
                                <span className="item-card-item-name">
                                    {item.title}
                                </span>
                            </div>
                            <span className="fs-6">
                                {item.listedAt.toLocaleString(undefined, {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ItemCard;
