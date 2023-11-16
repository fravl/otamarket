import axios from "axios";
import { RegistrationFormData } from "../types";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const register = async (data: RegistrationFormData) => {
    const request = axios.post(`${baseUrl}/auth/register`, data);
    const response = await request;
    return response;
};

export default { register };
