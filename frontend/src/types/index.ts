export type ItemSave = {
    // Will be dto for saving an item
    // Currently this is just placeholder and params do not represent what dto is supposed to be
    id: number;
    title: string;
    description: string;
    price: number;
    location: string;
    seller_id: number;
    categories: string[];
    thumbnail_id: number | null;
};

//Used for filter form
export type OptionType = {
    value: string;
    label: string;
};

export type ItemSummary = {
    id: number;
    title: string;
    price: number;
    claimCount: number;
    seller_id: number;
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

export type ClaimInfo = {
    claimCount: number;
    userHasClaim: boolean;
    userClaimPosition: number | null;
};

export type Claim = {
    item_id: number;
    timestamp: string;
    user_id: number;
};

export type Category = {
    id: number;
    name: string;
};

export type ItemCategory = {
    item_id: number;
    category_id: number;
};

export type RegistrationFormData = {
    email: string;
    telegram: string;
    password: string;
};

export type LoginFormData = Omit<RegistrationFormData, "telegram">;
