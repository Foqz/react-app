import {Book, CreateBook} from "./types/Book";
import {Box, Button, Modal, TextField} from "@mui/material";
import BookService from "./BookService";
import React, {useEffect, useState} from "react";

interface ModalProps {
    modalOpened: boolean,
    bookProps: Book
    setModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditBook = (modalProps: ModalProps) => {
    const {modalOpened, bookProps, setModalOpened} = modalProps;

    const [formData, setFormData] = useState<CreateBook>(
        {
            title: "",
            author: "",
            isbn: ""
        }
    );
    const modalWrapperStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        formData.title = bookProps.title
        formData.author = bookProps.author
        formData.isbn = bookProps.isbn
    });

    const submitForm = () => {
        console.log(formData);
        BookService.createBook(formData)
            .then(r => console.log("Book created"))
            .catch((error: Error) => {
                console.log(error);
            })
        setModalOpened(false);
    }

    return (
        <Modal open={modalOpened}>
            <Box sx={modalWrapperStyle}>
                <Box display="flex" justifyContent="space-between">
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
                    <Button sx={{
                        marginLeft: "10px",
                    }} variant="outlined" onClick={() => submitForm()}>Submit</Button>
                </Box>
            </Box>
        </Modal>
    )

}

export default EditBook