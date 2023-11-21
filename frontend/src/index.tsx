import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
    RouterProvider,
    createBrowserRouter,
    Navigate,
    Outlet,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./components/ErrorPage";
import ItemDetailsPage from "./components/ItemDetailsPage";
import HomePage from "./components/HomePage";
import AddItemPage from "./components/AddItemPage";
import ItemService from "./services/ItemService";
import CategoryService from "./services/CategoryService";
import App from "./App";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage";
import AuthService from "./services/AuthService";

const ProtectedRoute = () => {
    if (!AuthService.isAuthenticated()) {
        return <Navigate to={"/login"} replace />;
    }
    return <Outlet />;
};

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
                    const categories = await CategoryService.getAll();
                    const itemCategories =
                        await CategoryService.getItemCategories();
                    return { items, categories, itemCategories };
                },
            },
            {
                path: "item",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "add",
                        element: <AddItemPage />,
                        loader: async () => {
                            const allCategories =
                                await CategoryService.getAll();
                            return { allCategories };
                        },
                    },
                    {
                        path: ":id",
                        loader: async ({ params }) => {
                            if (!AuthService.isAuthenticated()) return null;
                            const item = await ItemService.getById(
                                parseInt(params.id!),
                            );
                            return { item };
                        },
                        element: <ItemDetailsPage />,
                    },
                ],
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
