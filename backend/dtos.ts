import { Item, ItemImage, User } from "./db/models";

export class ItemSummary {
    id: number;
    title: string;
    price: number;
    listedAt: Date;
    claimCount: number;
    thumbnail: string | null;
    seller_id: number;
    constructor(item: Item, claimCount: number) {
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
        this.seller_id = item.seller_id;
        this.listedAt = item.listed_at;
        this.claimCount = claimCount;
        this.thumbnail = item.thumbnail_id
            ? `/image/${item.thumbnail_id}.jpg`
            : null;
    }
}

export class ItemDetails {
    id: number;
    title: string;
    price: number;
    description: string;
    location: string;
    listedAt: Date;
    thumbnail: string | null;
    images: string[];
    seller_id: number;
    constructor(item: Item, images: ItemImage[]) {
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
        this.listedAt = item.listed_at;
        this.description = item.description;
        this.location = item.location;
        this.images = [];
        images.forEach((img) => {
            this.images.push(`/image/${img.id}.jpg`);
        });
        this.thumbnail = this.images[0] ?? null;
        this.seller_id = item.seller_id;
    }
}

export type ItemSave = Omit<Item, "id">;

export type UserSave = Omit<User, "id">;
