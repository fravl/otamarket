import { Link } from "react-router-dom";
import BackAndTitleNav from "./BackAndTitleNav";
import RegistrationForm from "./RegistrationForm";

const RegistrationPage = () => (
    <>
        <BackAndTitleNav title="Registration" />
        <div className="container mt-3">
            <RegistrationForm />
            <p className="mt-3 text-center">
                Already have an account? Login{" "}
                <Link to="/login" replace>
                    here
                </Link>
                .
            </p>
        </div>
    </>
);

export default RegistrationPage;
