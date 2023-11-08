import { ItemSummary } from "../types";
import { Link } from "react-router-dom";

const ItemCard = ({ item }: { item: ItemSummary }) => {
    function getThumbnail() {
        return <i className="bi bi-camera fs-1"></i>;
    }

    return (
        <div className="col-10 mx-auto mx-lg-0 col-md-6 col-lg-3 my-3">
            <Link className="item-card-navlink" to={`/item/${item.id}`}>
                <div className="item-card">
                    <div>
                        <div className="item-card-image d-flex justify-content-center align-items-center">
                            {getThumbnail()}
                        </div>
                        <span
                            className={`item-card-badge badge ${
                                item.claimCount === 0
                                    ? "bg-success"
                                    : "bg-warning"
                            }`}
                        >
                            {item.claimCount} in queue
                        </span>
                        {/* <span className={`"badge ${item.queueSize === 0 ? 'bg-success' : 'bg-warning' }"`}>{item.queueSize} in queue</span> */}
                    </div>
                    <div className="item-card-text-container">
                        <div className="item-card-item-pricecontainer">
                            <div>
                                <span className="item-card-item-price">{`${item.price} €`}</span>
                                <span className="item-card-item-name">
                                    {item.title}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ItemCard;
