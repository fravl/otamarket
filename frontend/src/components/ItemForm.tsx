import React, { useState } from "react";
import ItemService from "../services/ItemService";
import { Item } from "../types/Item";
import SubmitButton from "./SubmitButton";
import AddItemAlert from "./AddItemAlert"

const ItemForm = () => {
    const [alertStatus, setAlertStatus] = useState({
        status: 0,
        show: false
    });
    const [loadingSpinner, setLoadingSpinner] = useState(false);

    const [isChecked, setIsChecked] = useState(true);

    const [priceValue, setPriceValue] = useState('0');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        formData.append('price', priceValue);

        const formJson = Object.fromEntries(
            formData.entries(),
        ) as unknown as Item;
        setLoadingSpinner(true);

        ItemService.addItem(formJson)
            .then((res) => {
                setAlertStatus({status: res.status, show: true});
                form.reset();
            })
            .catch((error) => {
                setAlertStatus({status: error.response.status, show: true});
            })
            .finally(() => {
                setLoadingSpinner(false);
            });
    }

    return (
        <div className="container mt-3">
            <form method="post" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        id="title"
                        placeholder="Title"
                        required
                    />
                    <label htmlFor="title">Title</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="file"
                        className="form-control"
                        name="image"
                        id="picture"
                        placeholder="Add Image"
                    />
                    <label htmlFor="picture">Add Image</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="freeCheckbox" onChange={() => {setIsChecked(!isChecked); setPriceValue(!isChecked ? '0' : '');}} checked={isChecked} />
                    <label className="form-check-label" htmlFor="freeCheckbox">This item is free!</label>
                </div>
                <div className="input-group mb-3">
                    <div className="form-floating">
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            id="price"
                            placeholder="Price"
                            onChange={(e) => {setPriceValue(e.target.value)}}
                            disabled={isChecked}
                            value={priceValue}
                            required
                        />
                        <label htmlFor="price">Price</label>
                    </div>
                    <span className="input-group-text">€</span>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        id="location"
                        placeholder="Pickup location"
                    />
                    <label htmlFor="location">Pickup location</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        name="description"
                        id="description"
                        placeholder="Description"
                        style={{ height: "130px" }}
                    ></textarea>
                    <label htmlFor="description">Description</label>
                </div>
                <SubmitButton loading={loadingSpinner} />
                <AddItemAlert status={alertStatus.status} show={alertStatus.show}/>
            </form>
        </div>
    );
};

export default ItemForm;
