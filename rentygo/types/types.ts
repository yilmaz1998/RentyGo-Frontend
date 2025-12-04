export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

export interface Car {
    id: string;
    brand: string;
    model: string;
    year: number;
    pricePerDay: number;
    imageUrl: string;
}