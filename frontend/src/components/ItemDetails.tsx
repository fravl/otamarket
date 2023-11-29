import { Item } from "../types";

const priceToString = (price: number) => {
    return price > 0 ? `${price}€` : "FREE";
};

const ItemDetails = ({ item }: { item: Item }) => {
    return (
        <>
            <span className="item-page-price">
                {"Price: " + priceToString(item.price)}
            </span>
            <hr />
            <div className="item-page-description-container">
                <h2>Description</h2>
                <p className="item-page-description">
                    {item.description.trim() !== "" ? item.description : "-"}
                </p>
                <h2>Location</h2>
                <p className="item-page-description">
                    {item.location.trim() !== "" ? item.location : "-"}
                </p>
            </div>
            <hr />
        </>
    );
};

export default ItemDetails;
