const Book = require("../models/Book");

const addBook = async (req, res) => {

    try {

        const {
            title,
            author,
            category,
            isbn,
            totalQuantity
        } = req.body;

        const bookExists =
            await Book.findOne({
                isbn
            });

        if (bookExists) {

            return res.status(400).json({
                message:
                "Book already exists"
            });
        }

        const book =
            await Book.create({

                title,

                author,

                category,

                isbn,

                totalQuantity,

                availableQuantity:
                    totalQuantity
            });

        res.status(201).json(
            book
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const getBooks = async (req, res) => {

    try {

        const books =
            await Book.find();

        res.status(200).json(
            books
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const searchBooks = async (req, res) => {

    try {

        const keyword =
            req.query.keyword;

        const books =
            await Book.find({

                title: {
                    $regex: keyword,
                    $options: "i"
                }
            });

        res.status(200).json(
            books
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const getBookById = async (req, res) => {

    try {

        const book =
            await Book.findById(
                req.params.id
            );

        if (!book) {

            return res.status(404).json({
                message:
                    "Book Not Found"
            });
        }

        res.status(200).json(
            book
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const updateBook = async (req, res) => {

    try {

        const book =
            await Book.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true
                }
            );

        if (!book) {

            return res.status(404).json({
                message:
                    "Book Not Found"
            });
        }

        res.status(200).json(
            book
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const deleteBook = async (req, res) => {

    try {

        const book =
            await Book.findById(
                req.params.id
            );

        if (!book) {

            return res.status(404).json({
                message:
                    "Book Not Found"
            });
        }

        await Book.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message:
                "Book Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

module.exports = {
    addBook,
    getBooks,
    searchBooks,
    getBookById,
    updateBook,
    deleteBook
};