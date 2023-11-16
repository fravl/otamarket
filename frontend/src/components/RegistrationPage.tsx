import BackAndTitleNav from "./BackAndTitleNav";
import RegistrationForm from "./RegistrationForm";

const RegistrationPage = () => (
    <>
        <BackAndTitleNav title="Registration" />
        <div className="container mt-3">
            <RegistrationForm />
        </div>
    </>
);

export default RegistrationPage;
