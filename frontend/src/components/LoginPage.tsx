import { Link } from "react-router-dom";
import BackAndTitleNav from "./BackAndTitleNav";
import LoginForm from "./LoginForm";

const LoginPage = () => (
    <>
        <BackAndTitleNav title="Login" />
        <div className="container mt-3">
            <LoginForm />
            <p className="mt-3 text-center">
                No account yet? Register{" "}
                <Link to="/register" replace>
                    here
                </Link>
                .
            </p>
        </div>
    </>
);

export default LoginPage;
