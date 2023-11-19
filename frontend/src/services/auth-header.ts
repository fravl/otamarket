import { getToken } from "./AuthService";

export default function authHeader() {
    const token = getToken();
    if (token) {
        return {
            Authorization: `Bearer ${token}`,
        };
    } else {
        return {
            Authorization: `Bearer ${null}`,
        };
    }
}
