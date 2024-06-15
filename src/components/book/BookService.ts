import {Book} from "./types/Book";
import http from "../../http-common";

const getAllBooks = () => {
    return http.get<Array<Book>>("/books")
}

const getBookById = (id: string) => {
    return http.get(`/books/${id}`, {})
}

const BookService = {
    getAllBooks,
    getBookById
}

export default BookService;