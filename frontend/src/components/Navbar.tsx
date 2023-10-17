const Navbar = () => (
    <nav className="navbar navbar-light bg-light border-bottom">
        <div className="container ">
            <ul className="navbar-nav container d-flex flex-row justify-content-around align-items-center">
                <li className="nav-item">
                    <a href="#" className="nav-link active" aria-current="page">
                        All
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        Sales
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        Claims
                    </a>
                </li>
            </ul>
        </div>
    </nav>
);

export default Navbar;
