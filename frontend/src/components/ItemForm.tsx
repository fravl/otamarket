import React, { useState } from "react";
import ItemService from "../services/ItemService";
import { ItemSave } from "../types";
import SubmitButton from "./SubmitButton";
import AddItemAlert from "./AddItemAlert";
import { Form, InputGroup } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { CarouselItem } from "react-bootstrap";
import Select, { MultiValue } from "react-select";
import { useLoaderData } from "react-router-dom";
import { Category, OptionType } from "../types";



const ItemForm = () => {
    const { allCategories } = useLoaderData() as { allCategories: Category[] };

    const options: OptionType[] = []

    allCategories.forEach( (category: Category) => {
        const option: OptionType = {value: String(category.id), label: category.name}
        options.push(option)
    })

    const [alertStatus, setAlertStatus] = useState({
        status: 0,
        show: false,
    });

    const [loadingSpinner, setLoadingSpinner] = useState(false);

    const [isChecked, setIsChecked] = useState(true);

    const [priceValue, setPriceValue] = useState("0");

    const [categories, setCategories] = useState<string[]>([]);

    //const [imageURLs, setimageURLs] = useState<string[]>([]);

    const [imageData, setimageData] = useState<string[]>([]);

    const reader = new FileReader();

    reader.onloadend = () => {
        const b64str = reader.result as string;
        setimageData((prevData) => [...prevData, b64str]);
    };

    function handleImageCapture(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        if (e.target.files) {
            Array.from(e.target.files).forEach((f) => reader.readAsDataURL(f));
            console.log(`Img size: ${e.target.files[0].size / 1000}`);
            //const imgs = Array.from(e.target.files).map((imgData) => reader.readAsDataURL(imgData));
            //setimageURLs((prevImages) => [...prevImages, ...imgs]);
            //setimageData((prevData) => [...prevData, ...imgs]);
        }
    }

    function handleChange(e: MultiValue<OptionType>) {
        setCategories(e.map((optionType: OptionType) => optionType.value));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        formData.append("price", priceValue);

        /*imageData.forEach((img) => {
            formData.append("images", img);
        });*/

        const formJson = Object.fromEntries(
            formData.entries(),
        ) as unknown as ItemSave;
        setLoadingSpinner(true);

        formJson.categories = categories;
        formJson.images = imageData;

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
                setimageData([]);
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

                <div className="btn-toolbar">
                    <input
                        type="file"
                        accept="image/jpeg, image/jpg, image/png"
                        capture="user"
                        id="imageInput"
                        onChange={handleImageCapture}
                        className="d-none"
                    />
                    <input
                        type="file"
                        accept="image/jpeg, image/jpg, image/png"
                        id="imageInputUpload"
                        onChange={handleImageCapture}
                        className="d-none"
                    />
                    <label className="btn btn-primary" htmlFor="imageInput">
                        <i className="bi bi-camera"></i>
                        &nbsp;Capture Image
                    </label>
                    <div>&nbsp;</div>
                    <label
                        className="btn btn-primary"
                        htmlFor="imageInputUpload"
                    >
                        Upload Image
                    </label>
                </div>
                <Carousel
                    controls={imageData.length < 2 ? false : true}
                    className="mt-3 mb-3 border"
                    style={{ height: 300 }}
                >
                    {imageData.length === 0 && <CarouselItem></CarouselItem>}
                    {imageData.map((img, index) => {
                        return (
                            <CarouselItem style={{ maxHeight: 300 }}>
                                <img
                                    key={index}
                                    alt="item"
                                    className="mx-auto d-block img-fluid"
                                    style={{ maxHeight: 300 }}
                                    src={img}
                                />
                            </CarouselItem>
                        );
                    })}
                </Carousel>
                <Form.Check
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

                <Form.Group className="mb-3" controlId="category">
                    <Select
                        isMulti
                        options={options}
                        onChange={(e) => handleChange(e)}
                        className="basic-multi-select"
                        classNamePrefix="react-select"
                        placeholder="Select your categories"
                        theme={(theme) => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                neutral50: "#000000",
                            },
                        })}
                    />
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
