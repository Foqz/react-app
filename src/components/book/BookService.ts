import {Book, CreateBook} from "./types/Book";
import http from "../../http-common";

const getAllBooks = () => {
    return http.get<Array<Book>>("/books")
}

const getBookById = (id: string) => {
    return http.get(`/books/${id}`, {})
}

const createBook = (createBook: CreateBook) => {
    return http.post("/books", createBook)
}

const BookService = {
    getAllBooks,
    getBookById,
    createBook
}

export default BookService;