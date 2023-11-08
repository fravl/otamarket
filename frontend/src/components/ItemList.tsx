import ItemCard from "./ItemCard";
import { useLoaderData } from "react-router-dom";
import { ItemSummary } from "../types";

const ItemList = () => {
    const { items } = useLoaderData() as { items: ItemSummary[] };

    return (
        <div className="items-list" id="items-list">
            <div className="container">
                <div className="row">
                    {items.map((item) => {
                        return <ItemCard key={item.id} item={item} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default ItemList;
