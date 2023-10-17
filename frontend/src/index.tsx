import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import ErrorPage from "./components/ErrorPage";
import App from "./App";
import ProductDetailsPage from "./components/ProductDetailsPage";
import HomePage from "./components/HomePage";
import AddItemPage from "./components/AddItemPage";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/add",
                element: <AddItemPage />,
            },
            {
                path: "/:id",
                element: <ProductDetailsPage />,
            },
        ],
    },
]);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
