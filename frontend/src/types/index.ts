export type ItemSave = {
    // Will be dto for saving an item
    // Currently this is just placeholder and params do not represent what dto is supposed to be
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    seller_id: number;
    thumbnail_id: number | null;
};

export type ItemSummary = {
    id: number;
    title: string;
    price: number;
    claimCount: number;
    thumbnail: any;
};

export type ItemImageType = {
    id: number;
    image: any;
    order_num: number;
    item_id: number;
};

export type Item = {
    id: number;
    title: string;
    price: number;
    description: string;
    location: string;
    claimCount: number;
    thumbnail: any;
    images: any[];
};

export type RegistrationFormData = {
    email: string;
    telegram: string;
    password: string;
};
