import { IDatabase, IMain } from "pg-promise";
import { IResult } from "pg-promise/typescript/pg-subset";
import { User } from "../models";

export class UsersRepository {
    /**
     * @param db
     * Automated database connection context/interface.
     *
     * If you ever need to access other repositories from this one,
     * you will have to replace type 'IDatabase<any>' with 'any'.
     *
     * @param pgp
     * Library's root, if ever needed, like to access 'helpers'
     * or other namespaces available from the root.
     */
    constructor(
        private db: IDatabase<any>,
        private pgp: IMain,
    ) {}

    // Tries to delete a user by id, and returns the number of records deleted;
    remove(id: number): Promise<number> {
        return this.db.result(
            "DELETE FROM users WHERE id = $1",
            +id,
            (r: IResult) => r.rowCount,
        );
    }

    // Tries to find a user from id;
    findById(id: number): Promise<User | null> {
        return this.db.oneOrNone("SELECT * FROM users WHERE id = $1", +id);
    }

    findByEmail(email: string): Promise<User | null> {
        return this.db.oneOrNone("SELECT * FROM users WHERE email = $1", email);
    }

    // Returns the total number of users;
    total(): Promise<number> {
        return this.db.one(
            "SELECT count(*) FROM users",
            [],
            (a: { count: string }) => +a.count,
        );
    }

    add(user: Omit<User, "id">): Promise<User> {
        return this.db.one(
            "INSERT INTO users(email, password, telegram) VALUES(${email}, ${password}, ${telegram}) RETURNING *",
            {
                email: user.email,
                password: user.password,
                telegram: user.telegram,
            },
        );
    }
}
