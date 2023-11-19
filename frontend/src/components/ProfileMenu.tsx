import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const linkStyle = {
    color: "black",
    textDecoration: "none",
    width: "100%",
    display: "inline-block",
};

const ProfileMenu: React.FC = () => {
    const { token } = useAuth();
    const { logout } = useAuth();
    const authenticatedOptions = (
        <Dropdown.Item as="button" onClick={logout}>
            <Link to={"/"} style={linkStyle}>
                Logout
            </Link>
        </Dropdown.Item>
    );
    const unauthenticatedOptions = [
        <Dropdown.Item key={"login"} as="button">
            <Link to={"/login"} style={linkStyle}>
                Login
            </Link>
        </Dropdown.Item>,
        <Dropdown.Item key={"register"} as="button">
            <Link to={"/register"} style={linkStyle}>
                Register
            </Link>
        </Dropdown.Item>,
    ];

    return (
        <Dropdown>
            <Dropdown.Toggle
                id="dropdown-custom-trigger"
                variant="link"
                bsPrefix="custom-dropdown-toggle"
                style={linkStyle}
            >
                <i className="bi bi-person-circle h2 mb-0"></i>
            </Dropdown.Toggle>

            <style>
                {`
                    .custom-dropdown-toggle::after {
                        display: none !important;
                    }
                `}
            </style>

            <Dropdown.Menu>
                {!!token ? authenticatedOptions : unauthenticatedOptions}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileMenu;
