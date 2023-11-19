import { useEffect } from "react";
import { useToken } from "./useToken";
import { useCookies } from "./useCookies";
import { LoginFormData } from "../types";
import AuthService from "../services/AuthService";

export const useAuth = () => {
    const { contextToken: token, addToken, removeToken, setToken } = useToken();
    const { getItem } = useCookies();

    useEffect(() => {
        const token = getItem("TOKEN");
        if (token) {
            addToken(token);
        }
    }, []);

    const login = async (user: LoginFormData) => {
        const response = await AuthService.login(user);
        if (response.data.token) {
            addToken(response.data.token);
        }
        return response;
    };

    const logout = () => {
        removeToken();
    };

    return { token, login, logout, setToken };
};
