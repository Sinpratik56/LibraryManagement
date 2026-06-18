const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const {
    addBook,
    getBooks,
    searchBooks,
    getBookById,
    updateBook,
    deleteBook
} = require(
    "../controllers/bookController"
);

router.post("/",protect,authorize("Admin"),addBook);

router.get("/",protect,getBooks);

router.get("/search",protect,searchBooks);

router.get("/:id",protect,getBookById);

router.put("/:id",protect,authorize("Admin"),updateBook);

router.delete("/:id", protect,authorize("Admin"), deleteBook);

module.exports = router;