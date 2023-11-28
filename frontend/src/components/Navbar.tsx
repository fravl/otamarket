import { NavLink } from "react-router-dom";
import AuthService from "../services/AuthService";
const Navbar = () => {
    const links = () => {
        if (AuthService.isAuthenticated()) {
            return (
                <ul className="navbar-nav container d-flex flex-row justify-content-around align-items-center p-0">
                    <li className="nav-item">
                        <NavLink
                            to="/"
                            className="nav-link"
                            aria-current="page"
                        >
                            All
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/sales" className="nav-link">
                            Sales
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/claims" className="nav-link">
                            Claims
                        </NavLink>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="navbar-nav container d-flex flex-row justify-content-around align-items-center p-0">
                    <li className="nav-item">
                        <NavLink
                            to="/"
                            className="nav-link"
                            aria-current="page"
                        >
                            All
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <div
                            className="nav-link"
                            style={{
                                backgroundColor: "#D3D3D3",
                                color: "#bebebe",
                            }}
                        >
                            Sales
                        </div>
                    </li>
                    <li className="nav-item">
                        <div
                            className="nav-link"
                            style={{
                                backgroundColor: "#D3D3D3",
                                color: "#bebebe",
                            }}
                        >
                            Claims
                        </div>
                    </li>
                </ul>
            );
        }
    };

    return (
        <nav className="navbar navbar-light bg-light border-bottom">
            {links()}
        </nav>
    );
};

export default Navbar;
