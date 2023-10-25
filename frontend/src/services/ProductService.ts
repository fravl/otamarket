import axios from "axios";
import { Product } from "../types/Product";
const baseUrl = "http://localhost:8080";

const getAll = async (): Promise<Product[]> => {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data.products;
};

const getById = async (id: number): Promise<Product> => {
    const request = axios.get(`${baseUrl}/${id}`);
    const response = await request;
    return response.data;
};

const addItem = async (item: Product) => {
    await new Promise((r) => setTimeout(r, 100));
    console.log(item);
    alert("Item added!");
};

export default { getAll, getById, addItem };
