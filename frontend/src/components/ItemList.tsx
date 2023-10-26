import React from "react";
import ItemCard from "./ItemCard";
import { useOutletContext } from "react-router-dom";
import ItemOutletContext from "./Contexts/ItemOutletContext";

const ItemList = () => {
    const items = useOutletContext<ItemOutletContext>().items;

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
