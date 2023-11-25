import ItemCard from "./ItemCard";
import { useLoaderData } from "react-router-dom";
import { ItemSummary, Claim } from "../types";

const ClaimsList = () => {
    const { items } = useLoaderData() as { items: ItemSummary[] };
    const { claims } = useLoaderData() as { claims: Claim[] };

    const displayedItems = () => {
        const wantedIds = claims.map((claim) => claim.item_id);
        return items.filter((item) => wantedIds.includes(item.id));
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

export default ClaimsList;
