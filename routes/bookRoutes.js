const express = require("express");

const router = express.Router();

const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} = require("../controllers/bookController");

// GET all books
router.get("/", getAllBooks);

// GET one book
router.get("/:id", getBookById);

// CREATE book
router.post("/", createBook);

// UPDATE book
router.put("/:id", updateBook);

// DELETE book
router.delete("/:id", deleteBook);

module.exports = router;