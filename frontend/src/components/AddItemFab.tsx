import { Link } from "react-router-dom";

const AddItemFab = () => (
    <Link
        to="/add"
        className="btn btn-primary rounded-circle"
        title="Add New Item"
        style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "5rem",
            height: "5rem",
            textAlign: "center",
        }}
    >
        <i
            className="bi bi-plus-lg"
            style={{ position: "relative", bottom: "10%", fontSize: "3rem" }}
        ></i>
    </Link>
);

export default AddItemFab;
