import axios from "axios";
import { Item, ItemSave, ItemSummary } from "../types";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const getAll = async (): Promise<ItemSummary[]> => {
    const request = axios.get(baseUrl);
    const response = await request;
    console.log(response.data);
    return response.data;
};

const getById = async (id: number): Promise<Item | null> => {
    const request = axios.get(`${baseUrl}/items/${id}`);
    const response = await request;
    console.log(response.data);
    return response.data;
};

const addItem = async (item: ItemSave) => {
    const request = axios.post(`${baseUrl}/items/add`, item);
    const response = await request;
    return response;
};

export default { getAll, getById, addItem };
