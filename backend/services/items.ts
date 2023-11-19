import db from "../db";
import { ItemDetails, ItemSummary } from "../dtos";
import { Item } from "../db/models";

export async function all(): Promise<any> {
    const items = await db.items.all();
    
    const dtos = items.map(
        (item) =>  {
            if(item.thumbnail_id === null){
               return  new ItemSummary(item, item.claim_count)
            } else {
               return  new ItemSummary(item, item.claim_count, item.thumbnail)
            }
        }
    );

    return dtos;
}

export async function findById(id: number): Promise<ItemDetails | null> {
    const item = await db.items.findById(id);
    if (!item) return null;
    const images = await db.items.allImages();
    const imagesOfItem = images.filter((image) => image.item_id === item.id);

    if (imagesOfItem.length > 0) {
        return new ItemDetails(item, 2, imagesOfItem, imagesOfItem[0]);
    } else {
        return new ItemDetails(item, 2);
    }
}

export async function addItem(item: Omit<Item, "id">): Promise<any> {
    await db.items.addItem(item);
}
