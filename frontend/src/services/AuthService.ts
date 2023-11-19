import axios from "axios";
import Cookies from "universal-cookie";
import { LoginFormData, RegistrationFormData } from "../types";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const cookies = new Cookies();

export const register = async (data: RegistrationFormData) => {
    const request = axios.post(`${baseUrl}/auth/register`, data);
    const response = await request;
    return response;
};

export const login = async (data: LoginFormData) => {
    return axios.post(`${baseUrl}/auth/login`, data);
};

export const getToken = () => cookies.get("TOKEN") ?? null;

export const isAuthenticated = () => !!getToken();

export default { register, login, isAuthenticated };
