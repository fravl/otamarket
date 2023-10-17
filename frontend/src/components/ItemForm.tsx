const ItemForm = () => {
    return (
        <div className="container mt-3">
            <form>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Title"
                    />
                    <label htmlFor="title">Title</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="file"
                        className="form-control"
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
                        id="location"
                        placeholder="Pickup location"
                    />
                    <label htmlFor="location">Pickup location</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        id="description"
                        placeholder="Description"
                        style={{ height: "130px" }}
                    ></textarea>
                    <label htmlFor="description">Description</label>
                </div>
                <button type="submit" className="btn btn-primary">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default ItemForm;
