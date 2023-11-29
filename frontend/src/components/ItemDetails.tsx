import { Item } from "../types";

const priceToString = (price: number) => {
    return price > 0 ? `${price}€` : "FREE";
};

const ItemDetails = ({ item }: { item: Item }) => {
    return (
        <>
            <div className="item-page-description-container">
                <h2>Description</h2>
                <p className="item-page-description">
                    {item.description.trim() !== "" ? item.description : "-"}
                </p>
            </div>
            <span className="item-page-price">
                {"Price: " + priceToString(item.price)}
            </span>
            <hr />
        </>
    );
};

export default ItemDetails;
