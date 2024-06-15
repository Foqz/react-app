export interface Book {
    id?: number
    title?: string;
    author?: string;
    isbn?: string;
}

export interface CreateBook {
    title?: string;
    author?: string;
    isbn?: string;
}