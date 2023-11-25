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
import SalesPage from "./components/SalesPage";
import ClaimsPage from "./components/ClaimsPage";

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
                    const [items, categories, itemCategories] =
                        await Promise.all([
                            ItemService.getAll(),
                            CategoryService.getAll(),
                            CategoryService.getItemCategories(),
                        ]);
                    return { items, categories, itemCategories };
                },
            },
            {
                path: "/sales",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/sales",
                        element: <SalesPage />,
                        loader: async () => {
                            const [items, userId] = await Promise.all([
                                ItemService.getAll(),
                                AuthService.getUserId(),
                            ]);
                            return { items, userId };
                        },
                    },
                ],
            },
            {
                path: "/claims",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/claims",
                        element: <ClaimsPage />,
                        loader: async () => {
                            const [items, claims] = await Promise.all([
                                ItemService.getAll(),
                                ItemService.getUserClaims(
                                    AuthService.getUserId(),
                                ),
                            ]);
                            return { items, claims };
                        },
                    },
                ],
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
                            const [item, claimInfo] = await Promise.all([
                                ItemService.getById(parseInt(params.id!)),
                                ItemService.getClaimInfo(parseInt(params.id!)),
                            ]);
                            return { item, claimInfo };
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
