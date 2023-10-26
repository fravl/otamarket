import axios from "axios";
import { Item } from "../types/Item";
const baseUrl = "http://localhost:8080";

const getAll = async (): Promise<Item[]> => {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data.products;
};

const getById = async (id: number): Promise<Item> => {
    const request = axios.get(`${baseUrl}/items/${id}`);
    const response = await request;
    return response.data;
};

const addItem = async (item: Item) => {
    await new Promise((r) => setTimeout(r, 100));
    console.log(item);
    alert("Item added!");
};

export default { getAll, getById, addItem };
