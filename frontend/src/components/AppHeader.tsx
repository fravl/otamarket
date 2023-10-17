import { Link } from "react-router-dom";

const AppHeader = () => (
    <header className="py-2 bg-body-tertiary">
        <div className="container d-flex justify-content-between align-items-center">
            <Link
                className="mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none fs-4"
                to="/"
            >
                OtaMarket
            </Link>
            <Link className="icon-link link-dark" to="/profile">
                <i className="bi bi-person-circle h2 mb-0"></i>
            </Link>
        </div>
    </header>
);

export default AppHeader;