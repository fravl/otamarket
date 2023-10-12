import axios from "axios";
import { Product } from "../types/Product";
const baseUrl = "https://dummyjson.com/products";

const getAll = async (): Promise<Product[]> => {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
};

const getById = async (id: number): Promise<Product> => {
    const request = axios.get(`${baseUrl}/${id}`);
    const response = await request;
    return response.data;
};

export { getAll, getById };
