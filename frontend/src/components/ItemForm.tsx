import React, { useState } from "react";
import ItemService from "../services/ItemService";
import { ItemSave } from "../types";
import SubmitButton from "./SubmitButton";
import AddItemAlert from "./AddItemAlert";
import { Form, InputGroup } from "react-bootstrap";

const ItemForm = () => {
    const [alertStatus, setAlertStatus] = useState({
        status: 0,
        show: false,
    });
    const [loadingSpinner, setLoadingSpinner] = useState(false);

    const [isChecked, setIsChecked] = useState(true);

    const [priceValue, setPriceValue] = useState("0");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        formData.append("price", priceValue);

        const formJson = Object.fromEntries(
            formData.entries(),
        ) as unknown as ItemSave;
        setLoadingSpinner(true);

        ItemService.addItem(formJson)
            .then((res) => {
                setAlertStatus({ status: res.status, show: true });
                form.reset();
            })
            .catch((error) => {
                setAlertStatus({ status: error.response.status, show: true });
            })
            .finally(() => {
                setLoadingSpinner(false);
            });
    }

    return (
        <div className="container mt-3">
            <Form method="post" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Floating>
                        <Form.Control
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="Title"
                            required
                        />
                        <Form.Label>Title</Form.Label>
                    </Form.Floating>
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                    <Form.Floating>
                        <Form.Control
                            type="file"
                            placeholder="Add Image"
                            name="image"
                        />
                        <Form.Label>Add Image</Form.Label>
                    </Form.Floating>
                </Form.Group>

                <Form.Check
                    className="mb-3"
                    type="checkbox"
                    id="freeCheckbox"
                    label="This item is free!"
                    onChange={() => {
                        setIsChecked(!isChecked);
                        setPriceValue(!isChecked ? "0" : "");
                    }}
                    checked={isChecked}
                />

                <InputGroup className="mb-3">
                    <Form.Floating>
                        <Form.Control
                            type="number"
                            placeholder="Price"
                            name="price"
                            onChange={(e) => setPriceValue(e.target.value)}
                            disabled={isChecked}
                            value={priceValue}
                            required
                        />
                        <Form.Label>Price</Form.Label>
                    </Form.Floating>
                    <InputGroup.Text>€</InputGroup.Text>
                </InputGroup>

                <Form.Group className="mb-3" controlId="location">
                    <Form.Floating>
                        <Form.Control
                            type="text"
                            placeholder="Pickup location"
                            name="location"
                        />
                        <Form.Label>Pickup location</Form.Label>
                    </Form.Floating>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Floating>
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            style={{ height: "130px" }}
                            name="description"
                        />
                        <Form.Label>Description</Form.Label>
                    </Form.Floating>
                </Form.Group>

                <SubmitButton loading={loadingSpinner} />
                <AddItemAlert
                    status={alertStatus.status}
                    show={alertStatus.show}
                />
            </Form>
        </div>
    );
};

export default ItemForm;
