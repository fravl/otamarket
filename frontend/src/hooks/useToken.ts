import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { useCookies } from "./useCookies";

export const useToken = () => {
    const { token: contextToken, setToken } = useContext(AuthContext);
    const { setItem, removeItem } = useCookies();

    const addToken = (token: string) => {
        setToken(token);
        setItem("TOKEN", token, { maxAge: 360 * 24 });
    };

    const removeToken = () => {
        setToken(null);
        removeItem("TOKEN");
    };

    return { contextToken, addToken, removeToken, setToken };
};
