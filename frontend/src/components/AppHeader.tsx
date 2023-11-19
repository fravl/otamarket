import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

const AppHeader = () => (
    <header className="py-2 bg-body-tertiary">
        <div className="container d-flex justify-content-between align-items-center">
            <Link
                className="mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none fs-4"
                to="/"
            >
                OtaMarket
            </Link>
            <ProfileMenu />
        </div>
    </header>
);

export default AppHeader;
