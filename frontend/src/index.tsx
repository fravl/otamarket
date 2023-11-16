import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import ErrorPage from "./components/ErrorPage";
import ItemDetailsPage from "./components/ItemDetailsPage";
import HomePage from "./components/HomePage";
import AddItemPage from "./components/AddItemPage";
import ItemService from "./services/ItemService";
import App from "./App";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";

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
                loader: async () => {
                    const items = await ItemService.getAll();
                    return { items };
                },
            },
            {
                path: "/add",
                element: <AddItemPage />,
            },
            {
                path: "/item/:id",
                loader: async ({ params }) => {
                    const item = await ItemService.getById(
                        parseInt(params.id!),
                    );
                    return { item };
                },
                element: <ItemDetailsPage />,
            },
            {
                path: "/register",
                element: <RegistrationPage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
        ],
    },
]);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
