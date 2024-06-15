import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BookList from "./components/book/BookList";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="books" element={<BookList/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
