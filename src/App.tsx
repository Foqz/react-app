import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Box} from "@mui/material";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import bookList from "./components/book/BookList";
import BookList from "./components/book/BookList";

function App() {
  return (
      <BrowserRouter>
          <Routes>
                  <Route path="books" element={<BookList />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
