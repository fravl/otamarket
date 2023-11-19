import { User } from "../db/models";

declare global {
    namespace Express {
        export interface Request {
            user?: User;
        }
    }
}

export type JwtToken = {
    userId: number;
    userEmail: string;
};
