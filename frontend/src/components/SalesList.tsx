import ItemCard from "./ItemCard";
import { useLoaderData } from "react-router-dom";
import { ItemSummary } from "../types";

const SalesList = () => {
    const { items } = useLoaderData() as { items: ItemSummary[] };
    const { userId } = useLoaderData() as { userId: number };

    const displayedItems = () => {
        return items.filter((item) => item.seller_id === userId);
    };

    return (
        <div className="items-list" id="items-list">
            <div className="container">
                <div className="row">
                    {displayedItems().map((item) => {
                        return <ItemCard key={item.id} item={item} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default SalesList;
