import { IDatabase, IMain } from "pg-promise";
import { IResult } from "pg-promise/typescript/pg-subset";
import { Item, ItemImage } from "../models";

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

    all(): Promise<(Item & { claim_count: number, thumbnail: Buffer })[]> {
        return this.db.any(
            `SELECT i.*, count(c.item_id) as claim_count, array_agg(im.image) as thumbnail
                FROM items i
                LEFT JOIN claims c ON c.item_id = i.id
                LEFT JOIN item_images im ON im.id = i.thumbnail_id
                GROUP BY i.id
                ORDER BY listed_at DESC`,
        );
    }

    allImages(): Promise<ItemImage[]>{
        return this.db.any(
            'SELECT * FROM item_images'
        )
    }
}
