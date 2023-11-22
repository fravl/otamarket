import { IDatabase, IMain } from "pg-promise";
import { IResult } from "pg-promise/typescript/pg-subset";
import { Item, ItemImage, Category, ItemCategory } from "../models";

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

    all(): Promise<(Item & { claim_count: number; thumbnail: Buffer })[]> {
        return this.db.any(
            `SELECT i.*, count(c.item_id) as claim_count, array_agg(im.image) as thumbnail
                FROM items i
                LEFT JOIN claims c ON c.item_id = i.id
                LEFT JOIN item_images im ON im.id = i.thumbnail_id
                GROUP BY i.id
                ORDER BY listed_at DESC`,
        );
    }

    allCategories(): Promise<Category[]> {
        return this.db.any("SELECT * from categories");
    }

    allItemCategories(): Promise<ItemCategory[]> {
        return this.db.any("SELECT * from item_category");
    }

    allImages(itemId: number): Promise<ItemImage[]> {
        return this.db.manyOrNone(
            "SELECT * FROM item_images WHERE item_id = $1",
            itemId,
        );
    }

    addItem(item: Omit<Item, "id">): Promise<Item> {
        return this.db.one(
            `INSERT INTO items (title, description, price, location, seller_id, thumbnail_id)
                VALUES (
                    \${title},
                    \${description},
                    \${price},
                    \${location},
                    \${seller_id},
                    \${thumbnail_id}
                ) RETURNING *`,
            {
                title: item.title,
                description: item.description,
                price: item.price,
                location: item.location,
                seller_id: item.seller_id,
                thumbnail_id: item.thumbnail_id,
            },
        );
    }

    addToCategory(itemId: number, categoryId: number): Promise<any> {
        return this.db.one(
            `INSERT into item_category(item_id, category_id) VALUES (\${item_id},\${category_id}) RETURNING *`,
            {
                item_id: itemId,
                category_id: categoryId,
            },
        );
    }
}
