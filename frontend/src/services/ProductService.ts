import axios from "axios";
const baseUrl = "https://dummyjson.com/products";

const getAll = async () => {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
};

const getById = async (id: number) => {
    const request = axios.get(`${baseUrl}/${id}`);
    const response = await request;
    return response.data;
};

export { getAll, getById };
