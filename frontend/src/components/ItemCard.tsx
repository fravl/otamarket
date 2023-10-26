import React from "react";
import { Item } from "../types/Item";
import { Link } from "react-router-dom";

const ItemCard = ({ item }: { item: Item }) => {
    const queueSize = Math.random() < 0.7 ? 0 : 1;
    return (
        <React.Fragment>
            <div className="col-10 mx-auto mx-lg-0 col-md-6 col-lg-3 my-3">
                <Link className="item-card-navlink" to={`/${item.id}`}>
                    <div className="item-card">
                        <div>
                            <img
                                className="item-card-image"
                                alt="itemimg"
                                src={item.images[0]}
                            />
                            <span
                                className={`item-card-badge badge ${
                                    queueSize === 0
                                        ? "bg-success"
                                        : "bg-warning"
                                }`}
                            >
                                {queueSize} in queue
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
        </React.Fragment>
    );
};

export default ItemCard;
