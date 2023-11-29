import axios from "axios";
import { ClaimInfo, ContactInfo, Item, ItemSave, ItemSummary } from "../types";
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
    const request = axios.post<{ itemId: number }>(`${baseUrl}/items`, item, {
        headers: authHeader(),
    });
    const response = await request;
    console.log(response);
    return response;
};

const getUserClaims = async (userId: number) => {
    const request = axios.get<ClaimInfo>(`${baseUrl}/items/claims/${userId}`, {
        headers: authHeader(),
    });

    const response = await request;

    console.log(response.data);

    return response.data;
};

const getClaimInfo = async (itemId: number) => {
    const request = axios.get<ClaimInfo>(`${baseUrl}/items/${itemId}/claims`, {
        headers: authHeader(),
    });
    const response = await request;
    console.log(response.data);
    return response.data;
};

const getTopContact = async (itemId: number) => {
    const request = axios.get<ContactInfo>(
        `${baseUrl}/items/${itemId}/claims/contact`,
        {
            headers: authHeader(),
        },
    );
    const res = await request;
    return res.data;
};

const getSellerContact = async (itemId: number) => {
    const request = axios.get<ContactInfo>(
        `${baseUrl}/items/${itemId}/contact`,
        {
            headers: authHeader(),
        },
    );
    const res = await request;
    return res.data;
};

const skipClaim = async (itemId: number) => {
    const request = axios.put(
        `${baseUrl}/items/${itemId}/claims/skip`,
        {},
        {
            headers: authHeader(),
        },
    );
    const res = await request;
    return res.data;
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

const removeItem = async (id: number) => {
    const request = axios.delete(`${baseUrl}/items/${id}`, {
        headers: authHeader(),
    });
    const response = await request;
    console.log(response.data);
    return response.data;
};

export default {
    getAll,
    getById,
    addItem,
    getClaimInfo,
    claimItem,
    unclaimItem,
    getUserClaims,
    removeItem,
    getTopContact,
    skipClaim,
    getSellerContact,
};
