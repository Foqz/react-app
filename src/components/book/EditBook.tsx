import {Book} from "./types/Book";
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
    const [formData, setFormData] = useState<Book>();

    useEffect(() => {
        setFormData({
            id: bookProps.id,
            title: bookProps.title,
            author: bookProps.author,
            isbn: bookProps.isbn
        })
    }, [bookProps.author, bookProps.id, bookProps.isbn, bookProps.title]);
    
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

    const submitForm = () => {
        console.log(formData);
        if (!formData) {
            console.warn("Form data undefined")
            return
        }
        debugger;
        if (formData.id !== undefined && formData.id > 0) {
            BookService.updateBook(formData).then(r =>
                console.log("Book updated")
            ).catch((error: Error) => {
                console.log(error)
            })
        } else {
            BookService.createBook(formData)
                .then(r => console.log("Book created"))
                .catch((error: Error) => {
                    console.log(error);
                })
        }

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
                        value={formData?.title || ""}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                    <TextField
                        label="Author"
                        variant="outlined"
                        name="author"
                        value={formData?.author || ""}
                        onChange={(e) => setFormData({...formData, author: e.target.value})}
                    />
                    <TextField
                        label="isbn"
                        variant="outlined"
                        name="isbn"
                        value={formData?.isbn || ""}
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