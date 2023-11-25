import { Item, ItemImage, User } from "./db/models";

export class ItemSummary {
    id: number;
    title: string;
    price: number;
    claimCount: number;
    seller_id: number;
    thumbnail: Buffer | null;
    constructor(item: Item, claimCount: number, thumbnail?: Buffer | null) {
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
        this.seller_id = item.seller_id;
        this.claimCount = claimCount;
        this.thumbnail = thumbnail ?? null;
    }
}

export class ItemDetails {
    id: number;
    title: string;
    price: number;
    description: string;
    location: string;
    thumbnail: ItemImage | null;
    images: ItemImage[];
    constructor(item: Item, images: ItemImage[]) {
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
        this.description = item.description;
        this.location = item.location;
        this.images = images;
        this.thumbnail = images[0] ?? null;
    }
}

export type ItemSave = Omit<Item, "id">;

export type UserSave = Omit<User, "id">;
