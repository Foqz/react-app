import {useEffect, useState} from "react";
import {Book} from "./types/Book";
import BookService from "./BookService";
import EditIcon from '@mui/icons-material/Edit';
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
    const handleModalOpen = () => {
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
                                <TableCell>Acions</TableCell>
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
                                        <IconButton>
                                            <EditIcon/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="outlined" onClick={handleModalOpen}>Add book</Button>
            </Box>

            <EditBook
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
                bookProps={{
                    title: "",
                    author: "",
                    isbn: ""
                }}
             ></EditBook>
        </>
    )
}

export default BookList