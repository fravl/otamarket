const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container ">
            <ul className="nav container d-flex justify-content-around align-items-center">
                <li className="nav-item">
                    <a
                        href="#"
                        className="nav-link link-dark px-2 active"
                        aria-current="page"
                    >
                        All
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        href="#"
                        className="nav-link link-dark px-2 active"
                        aria-current="page"
                    >
                        Sales
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        href="#"
                        className="nav-link link-dark px-2 active"
                        aria-current="page"
                    >
                        Claims
                    </a>
                </li>
            </ul>
        </div>
    </nav>
);

export default Navbar;
