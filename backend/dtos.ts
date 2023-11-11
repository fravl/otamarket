import { Item, ItemImage } from "./db/models";

export class ItemSummary {
    id: number;
    title: string;
    price: number;
    claimCount: number;
    thumbnail: Buffer | null;
    constructor(item: Item, claimCount: number, thumbnail?: Buffer) {
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
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
    claimCount: number;
    thumbnail: ItemImage | null;
    images: ItemImage[];
    constructor(
        item: Item,
        claimCount: number,
        images?: ItemImage[],
        thumbnail?: ItemImage,
    ) {
        this.id = item.id;
        this.title = item.title;
        this.price = item.price;
        this.description = item.description;
        this.location = item.location;
        this.claimCount = claimCount;
        this.thumbnail = thumbnail ?? null;
        this.images = images ?? [];
    }
}
