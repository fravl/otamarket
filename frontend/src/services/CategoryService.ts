import axios from "axios";
import { Category, ItemCategory } from "../types";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const getAll = async (): Promise<Category[]> => {
    const request = axios.get(`${baseUrl}/categories`);
    const response = await request;
    console.log(response.data);
    return response.data;
};

const getItemCategories = async (): Promise<ItemCategory[]> => {
    const request = axios.get(`${baseUrl}/categories/items`);
    const response = await request;
    console.log(response.data);
    return response.data;
};

export default { getAll, getItemCategories };
