import { useNavigate } from "react-router-dom";

const BackAndTitleNav = ({ title }: { title: string }) => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-light bg-light border-bottom">
            <ul className="navbar-nav container d-flex flex-row justify-content-around align-items-center">
                <li className="nav-item">
                    <button
                        className="nav-link active"
                        aria-current="page"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>
                </li>
                <h6 className="mb-0">{title}</h6>
                <div></div>
            </ul>
        </nav>
    );
};

export default BackAndTitleNav;
