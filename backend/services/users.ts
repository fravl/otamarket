import db from "../db";
import { User } from "../db/models";

export async function add(user: Omit<User, "id">) {
    const existingUser = await db.users.findByEmail(user.email);

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    return await db.users.add(user);
}
