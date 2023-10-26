import React, { useState, useEffect } from "react";
import ItemService from "./services/ItemService";
import { Item } from "./types/Item";
import AppHeader from "./components/AppHeader";
import { Outlet } from "react-router-dom";
import ItemOutletContext from "./components/Contexts/ItemOutletContext";

function App() {
    const [items, setItems] = useState<Item[]>([]);

    //Fetch all items. This fetches only 6 first since we dont wanna fill site with 100+ dummy items while developin
    useEffect(() => {
        ItemService.getAll().then((initialItems) => {
            setItems(initialItems.slice(0, 6));
        });
        fetch("http://localhost:8080/").then(console.log);
    }, []);

    return (
        <>
            <AppHeader />
            <Outlet context={{ items: items } satisfies ItemOutletContext} />
        </>
    );
}

export default App;
