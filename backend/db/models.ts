interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    telegram: string;
}

interface ItemImage {
    id: number;
    image: Buffer; // Assuming binary data for images
    order_num: number;
    item_id: number;
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
    id: number;
    timestamp: Date;
    item_id: number;
    user_id: number;
}

export { User, ItemImage, Item, Category, ItemCategory, Claim };