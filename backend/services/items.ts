import db from "../db";
import { ItemDetails, ItemSummary } from "../dtos";

export async function all(): Promise<any> {
    const items = await db.items.all();
    const dtos = items.map((item) => new ItemSummary(item, item.claim_count, item.thumbnail ));

    return dtos;
}

export async function findById(id: number): Promise<ItemDetails | null> {
    const item = await db.items.findById(id);
    if (!item) return null;
    return new ItemDetails(item, 2);
}
