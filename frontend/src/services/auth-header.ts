import { getCurrentUser } from "./AuthService";

export default function authHeader() {
    const user = getCurrentUser();
    if (user?.token) {
        return {
            Authorization: `Bearer ${user.token}`,
        };
    } else {
        return {
            Authorization: `Bearer ${null}`,
        };
    }
}
