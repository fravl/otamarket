import { Link } from "react-router-dom";

const AddItemFab = () => (
    <Link
        to="/add"
        className="btn btn-primary rounded-circle"
        title="Add New Item"
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
    >
        <i className="bi bi-plus"></i>
    </Link>
);

export default AddItemFab;
