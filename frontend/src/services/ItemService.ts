import axios from "axios";
import { ClaimInfo, Item, ItemSave, ItemSummary } from "../types";
import authHeader from "./auth-header";
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const getAll = async (): Promise<ItemSummary[]> => {
    const request = axios.get(baseUrl);
    const response = await request;
    console.log(response.data);
    return response.data;
};

const getById = async (id: number): Promise<Item | null> => {
    const request = axios.get(`${baseUrl}/items/${id}`, {
        headers: authHeader(),
    });
    const response = await request;
    console.log(response.data);
    return response.data;
};

const addItem = async (item: ItemSave) => {
    const request = axios.post(`${baseUrl}/items/add`, item, {
        headers: authHeader(),
    });
    const response = await request;
    console.log(response);
    return response;
};

const getClaimInfo = async (itemId: number) => {
    const request = axios.get<ClaimInfo>(`${baseUrl}/items/${itemId}/claims`, {
        headers: authHeader(),
    });
    const response = await request;
    console.log(response.data);
    return response.data;
};

const claimItem = async (itemId: number) => {
    const request = axios.post<ClaimInfo>(
        `${baseUrl}/items/${itemId}/claims`,
        {},
        {
            headers: authHeader(),
        },
    );
    const response = await request;
    console.log(response.data);
    return response;
};

const unclaimItem = async (itemId: number) => {
    const request = axios.delete<ClaimInfo>(
        `${baseUrl}/items/${itemId}/claims`,
        {
            headers: authHeader(),
        },
    );
    const response = await request;
    console.log(response.data);
    return response;
};

export default {
    getAll,
    getById,
    addItem,
    getClaimInfo,
    claimItem,
    unclaimItem,
};
