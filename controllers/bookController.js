const fs = require("fs");

const filePath = "./data/books.json";

// Read books
const readBooks = () => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// Write books
const writeBooks = (books) => {
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
};

// GET ALL BOOKS
const getAllBooks = (req, res) => {
    const books = readBooks();

    res.status(200).json({
        message: "Books fetched successfully",
        totalBooks: books.length,
        books,
    });
};

// GET SINGLE BOOK
const getBookById = (req, res) => {
    const books = readBooks();

    const book = books.find((b) => b.id == req.params.id);

    if (!book) {
        return res.status(404).json({
            message: "Book Not Found",
        });
    }

    res.status(200).json(book);
};

// CREATE BOOK
const createBook = (req, res) => {
    const books = readBooks();

    const newBook = {
        id: Date.now(),
        title: req.body.title,
        author: req.body.author,
        tag: req.body.tag,
    };

    books.push(newBook);

    writeBooks(books);

    res.status(201).json({
        message: "Book Added Successfully",
        data: newBook,
    });
};

// UPDATE BOOK
const updateBook = (req, res) => {
    const books = readBooks();

    const index = books.findIndex((b) => b.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book Not Found",
        });
    }

    books[index] = {
        ...books[index],
        title: req.body.title,
        author: req.body.author,
        tag: req.body.tag,
    };

    writeBooks(books);

    res.status(200).json({
        message: "Book Updated Successfully",
        data: books[index],
    });
};

// DELETE BOOK
const deleteBook = (req, res) => {
    let books = readBooks();

    const book = books.find((b) => b.id == req.params.id);

    if (!book) {
        return res.status(404).json({
            message: "Book Not Found",
        });
    }

    books = books.filter((b) => b.id != req.params.id);

    writeBooks(books);

    res.status(200).json({
        message: "Book Deleted Successfully",
    });
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};