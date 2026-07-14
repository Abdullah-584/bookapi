const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} = require("../controllers/bookController");


// GET all books
router.get("/", authMiddleware, getAllBooks);

// GET one book
router.get("/:id", authMiddleware, getBookById);

// CREATE book
router.post("/", authMiddleware, createBook);

// UPDATE book
router.put("/:id", authMiddleware, updateBook);

// DELETE book
router.delete("/:id", authMiddleware, deleteBook);

module.exports = router;