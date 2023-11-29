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
            "DELETE FROM items WHERE id = $1",
            +id,
            (r: IResult) => r.rowCount,
        );
    }

    removeFromCategories(item_id: number){
        return this.db.result(
            "DELETE FROM item_category WHERE item_id = $1",
            +item_id,
            (r: IResult) => r.rowCount,
        );
    }

    findById(id: number): Promise<Item | null> {
        return this.db.oneOrNone("SELECT * FROM items WHERE id = $1", +id);
    }

    /*
    all(): Promise<(Item & { claim_count: number; thumbnail: number })[]> {
        return this.db.any(
            `SELECT i.*, count(c.item_id) as claim_count, array_agg(im.image) as thumbnail
                FROM items i
                LEFT JOIN claims c ON c.item_id = i.id
                LEFT JOIN item_images im ON im.id = i.thumbnail_id
                GROUP BY i.id
                ORDER BY listed_at DESC`,
        );
    }
    */
    all(): Promise<(Item & { claim_count: number })[]> {
        return this.db.any(
            `SELECT i.*, COUNT(CASE WHEN c.skipped = FALSE THEN 1 END) AS claim_count
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

    addImage(imgData: Buffer, itemId: number): Promise<ItemImage> {
        return this.db.one(
            'INSERT INTO item_images (image, item_id) VALUES ($1, $2) RETURNING *', [imgData, itemId]
        )
    }

    addThumbnail(itemId: number, imgId: number): Promise<any> {
        //console.log(`UPDATE items SET thumbnail_id = ${img.id} WHERE id = ${img.itemId}`);
        return this.db.one(
            'UPDATE items SET thumbnail_id = $1 WHERE id = $2 RETURNING *', [imgId, itemId]
        )
    }

    getImageById(imgId: number): Promise<ItemImage | null> {
        return this.db.oneOrNone("SELECT * FROM item_images WHERE id = $1", imgId);
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
