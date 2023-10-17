const AddItemFab = () => (
    <a
        href="/add-item"
        className="btn btn-primary rounded-circle floating-btn"
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="Add New Item"
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
    >
        <i className="bi bi-plus"></i>
    </a>
);

export default AddItemFab;
