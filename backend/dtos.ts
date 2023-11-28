import { Item, ItemImage, User } from "./db/models";

export class ItemSummary {
    id: number;
    title: string;
    price: number;
    claimCount: number;
    thumbnail: string | null;
    constructor(item: Item, claimCount: number) {
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
        this.claimCount = claimCount;
        this.thumbnail = item.thumbnail_id ? `/image/${item.thumbnail_id}.jpg` : null;
    }
}

export class ItemDetails {
    id: number;
    title: string;
    price: number;
    description: string;
    location: string;
    thumbnail: string | null;
    images: string[];
    constructor(item: Item, images: ItemImage[]) {
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
        this.description = item.description;
        this.location = item.location;
        this.images = [];
        images.forEach((img) => {
            this.images.push(`/image/${img.id}.jpg`);
        });
        this.thumbnail = this.images[0] ?? null;
    }
}

export type ItemSave = Omit<Item, "id">;

export type UserSave = Omit<User, "id">;
