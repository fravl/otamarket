import { Link } from "react-router-dom";

const Navbar = () => (
    <nav className="navbar navbar-light bg-light border-bottom">
        <div className="container ">
            <ul className="navbar-nav container d-flex flex-row justify-content-around align-items-center">
                <li className="nav-item">
                    <Link
                        to="/"
                        className="nav-link active"
                        aria-current="page"
                    >
                        All
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Sales
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Claims
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
);

export default Navbar;
