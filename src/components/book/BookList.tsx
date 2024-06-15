import {useEffect, useState} from "react";
import {Book} from "./types/Book";
import BookService from "./BookService";
import {Paper, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const BookList = () => {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        fetchBooks();
    }, [])

    const fetchBooks = () => {
        BookService.getAllBooks()
            .then((response: any | null) => {
                console.log(response);
                setBooks(response.data);
            }).catch((error: Error) => {
            console.log(error);
        })
    }

    return (
        <>
            <TableContainer component={Paper}>
                <TableHead>
                    <TableRow>
                        <TableCell>Book ID</TableCell>
                        <TableCell>Book Title</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>ISBN</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book) => (
                        <TableRow key={book.id}>
                            <TableCell>{book.id}</TableCell>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.isbn}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableContainer>
        </>
    )
}

export default BookList