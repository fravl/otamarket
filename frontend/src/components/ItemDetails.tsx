import { Item } from "../types";

const priceToString = (price: number) => {
    return price > 0 ? `${price}€` : "FREE";
};

const ItemDetails = ({ item }: { item: Item }) => {
    return (
        <>
            <hr />
            <h1 className="item-page-title">{item.title}</h1>
            <hr />
            <div className="item-page-description-container">
                <h2>item description</h2>
                <p className="item-page-description">{item.description}</p>
            </div>
            <span className="item-page-price">
                {"Price: " + priceToString(item.price)}
            </span>
            <hr />
        </>
    );
};

export default ItemDetails;
