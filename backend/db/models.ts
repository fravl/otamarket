interface User {
    id: number;
    email: string;
    password: string;
    telegram: string;
}

interface ItemImage {
    id: number;
    image: Buffer; // Assuming binary data for images
    itemId: number;
}

interface Item {
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    seller_id: number;
    thumbnail_id: number | null;
    listed_at: Date;
}

interface Category {
    id: number;
    name: string;
}

interface ItemCategory {
    item_id: number;
    category_id: number;
}

interface Claim {
    timestamp: Date;
    item_id: number;
    user_id: number;
}

export { User, ItemImage, Item, Category, ItemCategory, Claim };
