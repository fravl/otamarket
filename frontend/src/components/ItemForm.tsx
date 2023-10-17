import ProductService from "../services/ProductService";
import { Product } from "../types/Product";

const ItemForm = () => {
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(
            formData.entries(),
        ) as unknown as Product;
        ProductService.addItem(formJson);
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
                <div className="input-group mb-3">
                    <div className="form-floating">
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            id="price"
                            placeholder="Price"
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
                <button type="submit" className="btn btn-primary w-100">
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default ItemForm;
