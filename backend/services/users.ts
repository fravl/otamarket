import db from "../db";
import { User } from "../db/models";

export async function add(user: Omit<User, "id">) {
    const existingUser = await db.users.findByEmail(user.email);

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    return await db.users.add(user);
}

export async function verifyLogin(credentials: {
    email: string;
    password: string;
}) {
    const user = await db.users.findByEmail(credentials.email);

    if (!user) {
        throw new Error(`No user ${credentials.email} exists`);
    }
    if (user.password !== credentials.password) {
        throw new Error(`Wrong password for user ${user.email}`);
    }
    return user;
}
