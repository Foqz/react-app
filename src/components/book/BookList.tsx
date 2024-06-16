import React, {useEffect, useState} from "react";
import {Book} from "./types/Book";
import BookService from "./BookService";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import EditBook from "./EditBook";

const BookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const [modalProps, setModalProps] = useState<Book>()

    useEffect(() => {
        fetchBooks();
    }, [modalOpened])

    const fetchBooks = () => {
        BookService.getAllBooks()
            .then((response: any | null) => {
                console.log(response);
                setBooks(response.data);
            }).catch((error: Error) => {
            console.log(error);
        })
    }

    const handleAddNewBook = () => {
        setModalProps({
            id: 0,
            title: "",
            author: "",
            isbn: ""
        })
        setModalOpened(true)
    }

    const handleDeleteBook = (id: number) => {
        BookService.deleteBook(id).then().then(r => {
                console.log("Book deleted")
                fetchBooks()
            }
        ).catch((error: Error) => {
            console.log(error)
        })
    }

    const handleUpdateBook = (bookProps: Book) => {
        setModalProps({
            id: bookProps.id,
            author: bookProps.author,
            title: bookProps.title,
            isbn: bookProps.isbn
        })
        setModalOpened(true)
    }

    return (
        <>
            <Box m={5}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Book ID</TableCell>
                                <TableCell>Book Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>ISBN</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map((book) => (
                                <TableRow key={book.id}>
                                    <TableCell>{book.id}</TableCell>
                                    <TableCell>{book.title}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.isbn}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleUpdateBook({
                                                id: book.id,
                                                title: book.title,
                                                author: book.author,
                                                isbn: book.isbn
                                            }
                                        )}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteBook(book.id || 0)}>
                                            <ClearIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="outlined" onClick={handleAddNewBook}>Add book</Button>
            </Box>

            <EditBook
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
                bookProps={modalProps || {}}
            ></EditBook>
        </>
    )
}

export default BookList