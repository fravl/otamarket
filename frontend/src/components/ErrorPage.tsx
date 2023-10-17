import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import BackAndTitleNav from "./BackAndTitleNav";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        // error is type `ErrorResponse`
        errorMessage = error.data.message || error.statusText;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === "string") {
        errorMessage = error;
    } else {
        console.error(error);
        errorMessage = "Unknown error";
    }

    return (
        <div id="error-page" className="container">
            <BackAndTitleNav title="Oops!"></BackAndTitleNav>
            <p className="lead">Sorry, an unexpected error has occurred.</p>
            <p className="lead">
                <i>{errorMessage}</i>
            </p>
        </div>
    );
}
