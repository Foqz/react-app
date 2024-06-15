import {useEffect, useState} from "react";
import {Book, CreateBook} from "./types/Book";
import BookService from "./BookService";
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";

const BookList = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [formData, setFormData] = useState<CreateBook>(
        {
            title: "",
            author: "",
            isbn: ""
        }
    );

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

    const submitForm = () => {
        console.log(formData);
        BookService.createBook(formData)
            .then(r => fetchBooks()).catch((error: Error) => {
            console.log(error);
        })
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
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
                </Table>
            </TableContainer>
            <Box m={5}>
                <form onSubmit={submitForm}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        name="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                    <TextField
                        label="Author"
                        variant="outlined"
                        name="author"
                        value={formData.author}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                    />
                    <TextField
                        label="isbn"
                        variant="outlined"
                        name="isbn"
                        value={formData.isbn}
                        onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                    />
                    <Button variant="outlined" onClick={() => submitForm()}>Submit</Button>
                </form>
            </Box>
        </>
    )
}

export default BookList