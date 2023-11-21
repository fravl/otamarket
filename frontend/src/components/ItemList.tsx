import React, { useState } from "react";
import ItemCard from "./ItemCard";
import { useLoaderData } from "react-router-dom";
import { Category, ItemSummary, OptionType, ItemCategory } from "../types";
import Button from "react-bootstrap/Button";
import Select, { MultiValue } from "react-select";

const ItemList = () => {
    const { items } = useLoaderData() as { items: ItemSummary[] };
    const { categories } = useLoaderData() as { categories: Category[] };
    const { itemCategories } = useLoaderData() as {
        itemCategories: ItemCategory[];
    };

    const [showFilterForm, setShowFilterForm] = useState<boolean>(false);
    const [filterValues, setFilterValues] = useState<string[]>([]);

    const options: OptionType[] = [];

    categories.forEach((category: Category) => {
        const option: OptionType = {
            value: String(category.id),
            label: category.name,
        };
        options.push(option);
    });

    const handleChange = (e: MultiValue<OptionType>) => {
        setFilterValues(e.map((optionType) => optionType.value));
    };

    const displayedItems = () => {
        if (filterValues.length === 0) {
            return items;
        } else {
            const categoriesAsInts: number[] = filterValues.map((value) =>
                parseInt(value),
            );

            const wantedItemIds = itemCategories
                .filter((itemCategory) =>
                    categoriesAsInts.includes(itemCategory.category_id),
                )
                .map((itemCategory) => itemCategory.item_id);

            const wantedItems = items.filter((item) =>
                wantedItemIds.includes(item.id),
            );

            return wantedItems;
        }
    };

    const filterForm = () => {
        if (showFilterForm) {
            return (
                <Select
                    isMulti
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="react-select"
                    onChange={(e) => handleChange(e)}
                    placeholder="Select your categories"
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            neutral50: "#000000",
                        },
                    })}
                />
            );
        } else {
            //nothing
        }
    };

    return (
        <div className="items-list" id="items-list">
            <div className="container">
                <div className="filter-button-container">
                    <Button
                        variant="primary"
                        onClick={() => setShowFilterForm(!showFilterForm)}
                    >
                        <i className="bi bi-filter"></i>
                        Filter
                    </Button>
                    {filterForm()}
                </div>
                <div className="row">
                    {displayedItems().map((item) => {
                        return <ItemCard key={item.id} item={item} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default ItemList;
