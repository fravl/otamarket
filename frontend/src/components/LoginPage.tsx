import BackAndTitleNav from "./BackAndTitleNav";
import LoginForm from "./LoginForm";

const LoginPage = () => (
    <>
        <BackAndTitleNav title="Login" />
        <div className="container mt-3">
            <LoginForm />
        </div>
    </>
);

export default LoginPage;
