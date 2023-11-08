import { IDatabase, IMain } from "pg-promise";
import { IResult } from "pg-promise/typescript/pg-subset";
import { Item } from "../models";

export class ItemsRepository {
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

    remove(id: number): Promise<number> {
        return this.db.result(
            "DELETE FROM products WHERE id = $1",
            +id,
            (r: IResult) => r.rowCount,
        );
    }

    findById(id: number): Promise<Item | null> {
        return this.db.oneOrNone("SELECT * FROM items WHERE id = $1", +id);
    }

    all(): Promise<(Item & { claim_count: number })[]> {
        return this.db.any(
            `SELECT items.*, count(claims.item_id) as claim_count
                FROM items
                LEFT JOIN claims ON claims.item_id = items.id
                GROUP BY items.id
                ORDER BY listed_at DESC`,
        );
    }
}
