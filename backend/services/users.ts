import db from "../db";
import { User } from "../db/models";
import bcrypt from "bcrypt";

export async function add(user: Omit<User, "id">): Promise<User> {
    const existingUser = await db.users.findByEmail(user.email);

    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    await bcrypt.hash(user.password, 4)
        .then(hash => {
            console.log(`Hashed pw ${hash}`);
            user.password = hash;
        })
    return await db.users.add(user);
}

export async function verifyLogin(credentials: {
    email: string;
    password: string;
}) {
    const user = await findByEmail(credentials.email);

    const match = await bcrypt.compare(credentials.password, user.password);
    if (match) {
        return user;
    } else {
        throw new Error(`Wrong password for user ${user.email}`);
    }
}

export async function findById(id: number) {
    return await db.users.findById(id);
}

export async function findByEmail(email: string) {
    const user = await db.users.findByEmail(email);
    if (!user) throw new Error(`No user ${email} exists`);
    return user;
}
