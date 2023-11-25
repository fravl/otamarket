import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light border-bottom">
            <ul className="navbar-nav container d-flex flex-row justify-content-around align-items-center p-0">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link" aria-current="page">
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
        </nav>
    );
};

export default Navbar;
