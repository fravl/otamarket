import axios from "axios";
const baseUrl = "endpoint for products";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => {
        return response.data;
    });
};

export default { getAll };
