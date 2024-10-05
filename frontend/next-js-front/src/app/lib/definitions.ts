export type user = {
    username: string;
    password: string;
    email: string;
}

export type item = {
    id: number;
    name: string;
    description: string;
    type_item: string;
    price: string;
    photo: string | File | null;
}

