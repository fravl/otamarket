import db from "../db";
import { ItemDetails, ItemSummary } from "../dtos";
import { Item, ItemImage } from "../db/models";
import { toByteArray } from "base64-js";
import sharp from "sharp";

export async function all(): Promise<any> {
    const items = await db.items.all();

    const dtos = items.map((item) => {
        return new ItemSummary(item, item.claim_count);
    });

    return dtos;
}

export async function allCategories(): Promise<any> {
    const categories = await db.items.allCategories();

    return categories;
}

export async function allItemCategories(): Promise<any> {
    const categories = await db.items.allItemCategories();

    return categories;
}

export async function findById(id: number): Promise<ItemDetails | null> {
    const item = await db.items.findById(id);
    if (!item) return null;
    const images = await db.items.allImages(id);
    return new ItemDetails(item, images);
}

export async function addItem(
    item: Omit<Item, "id">,
    categories: string[],
): Promise<Item> {
    const res = await db.items.addItem(item);

    const addedItemId: number = res.id;

    for (const category of categories) {
        await db.items.addToCategory(addedItemId, parseInt(category));
    }
    return res;
}

export async function addImage(imgData: string, imgExt: string, itemId: number): Promise<ItemImage> {
    const barray = toByteArray(imgData);
    let binaryData;
    if (imgExt === 'png') {
        console.log('png image');
        await sharp(barray).jpeg().toBuffer()
            .then(jpeg => {
                binaryData = jpeg;
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        binaryData = Buffer.from(barray);
    }
    const res = await db.items.addImage(binaryData as Buffer, itemId);
    console.log(`RES: ${res.id}`);
    return res;
}

export async function addThumbnail(itemId: number, imgId: number) {
    return await db.items.addThumbnail(itemId, imgId);
}

export async function getImage(imgId: number) {
    return await db.items.getImageById(imgId);
}
