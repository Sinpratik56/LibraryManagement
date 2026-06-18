const Issue = require("../models/Issue");
const Book = require("../models/Book");
const Student = require("../models/Student");

const calculateFine =
    (overdueDays) => {

        if (overdueDays <= 30) {

            return overdueDays;
        }

        return (
            30 +
            (
                (overdueDays - 30) * 5
            )
        );
    };

const issueBook = async (req, res) => {

    try {

        const {
            bookId,
            studentId
        } = req.body;

        const book =
            await Book.findById(bookId);

        if (!book) {

            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        const student =
            await Student.findById(studentId);

        if (!student) {

            return res.status(404).json({
                message: "Student Not Found"
            });
        }

        if (
            book.availableQuantity <= 0
        ) {

            return res.status(400).json({
                message:
                "Book Not Available"
            });
        }

        const dueDate =
            new Date();

        dueDate.setDate(
            dueDate.getDate() + 14
        );

        const issue =
            await Issue.create({

                book: bookId,

                student: studentId,

                dueDate
            });

        book.availableQuantity -= 1;

        await book.save();

        res.status(201).json(
            issue
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const getIssuedBooks = async (req, res) => {

    try {

        const issues =
            await Issue.find()

            .populate(
                "book",
                "title author"
            )

            .populate(
                "student",
                "studentId name"
            );

        res.status(200).json(
            issues
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const returnBook = async (req, res) => {

    try {

        const issue =
            await Issue.findById(
                req.params.id
            );

        if (!issue) {

            return res.status(404).json({
                message:
                    "Issue Record Not Found"
            });
        }

        if (
            issue.status === "Returned"
        ) {

            return res.status(400).json({
                message:
                    "Book Already Returned"
            });
        }

        const book =
            await Book.findById(
                issue.book
            );

        book.availableQuantity += 1;

        await book.save();

        const returnDate =
            new Date();

        issue.returnDate =
            returnDate;

        const dueDate =
            new Date(
                issue.dueDate
            );

        const diffTime =
            returnDate - dueDate;

        const overdueDays =
            Math.ceil(
                diffTime /
                (1000 * 60 * 60 * 24)
            );

        issue.status =
    "Returned";

if (overdueDays > 0) {

    issue.fine =
        calculateFine(
            overdueDays
        );

} else {

    issue.fine = 0;
}

        await issue.save();

        res.status(200).json(
            issue
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const getOverdueBooks = async (req, res) => {

    try {

        const today = new Date();

        const overdueBooks =
            await Issue.find({

                dueDate: {
                    $lt: today
                },

                status: "Issued"
            })

            .populate(
                "book",
                "title author"
            )

            .populate(
                "student",
                "studentId name"
            );

        const updatedBooks =
    overdueBooks.map(
        (issue) => {

            const overdueDays =
                Math.ceil(

                    (
                        today -
                        new Date(
                            issue.dueDate
                        )
                    ) /

                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                );

            return {

                ...issue.toObject(),

                fine:
                    calculateFine(
                        overdueDays
                    )
            };
        }
    );

res.status(200).json(
    updatedBooks
);

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const getStudentHistory = async (req, res) => {

    try {

        const studentId =
            req.params.studentId;

        const history =
            await Issue.find({

                student: studentId
            })

            .populate(
                "book",
                "title author"
            )

            .populate(
                "student",
                "studentId name"
            )

            .sort({
                createdAt: -1
            });

        const today =
    new Date();

const updatedHistory =
    history.map(
        (issue) => {

            let fine =
                issue.fine;

            if (
                issue.status === "Issued" &&
                new Date(
                    issue.dueDate
                ) < today
            ) {

                const overdueDays =
                    Math.ceil(

                        (
                            today -
                            new Date(
                                issue.dueDate
                            )
                        ) /

                        (
                            1000 *
                            60 *
                            60 *
                            24
                        )
                    );

                fine =
                    calculateFine(
                        overdueDays
                    );
            }

            return {

                ...issue.toObject(),

                fine
            };
        }
    );

res.status(200).json(
    updatedHistory
);

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const getDashboardStats = async (req, res) => {

    try {

        const totalBooks =
            await Book.countDocuments();

        const totalStudents =
            await Student.countDocuments();

        const issuedBooks =
            await Issue.countDocuments({
                status: "Issued"
            });

        const returnedBooks =
            await Issue.countDocuments({
                status: "Returned"
            });

        const overdueBooks =
    await Issue.countDocuments({

        dueDate: {
            $lt: new Date()
        },

        status: "Issued"
    });

        let totalFine = 0;

const issues =
    await Issue.find();

issues.forEach(
    (issue) => {

        // Returned books with fines

        if (
            issue.status ===
            "Returned"
        ) {

            totalFine +=
                issue.fine || 0;
        }

        // Active overdue books

        else if (
            issue.status ===
            "Issued" &&

            new Date(
                issue.dueDate
            ) < new Date()
        ) {

            const overdueDays =
                Math.ceil(

                    (
                        new Date() -
                        new Date(
                            issue.dueDate
                        )
                    ) /

                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                );

            totalFine +=
                calculateFine(
                    overdueDays
                );
        }
    }
);

        res.status(200).json({

            totalBooks,

            totalStudents,

            issuedBooks,

            returnedBooks,

            overdueBooks,

            totalFine
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const getStudentDashboard =
    async (req, res) => {

        try {

            const studentId =
                req.params.studentId;

            const totalBooks =
                await Book.countDocuments();

            const myIssuedBooks =
                await Issue.countDocuments({

                    student: studentId,

                    status: "Issued"
                });

            const myIssues =
                await Issue.find({

                    student: studentId,

                    status: "Issued"
                });

            let myFine = 0;

            myIssues.forEach(
                (issue) => {

                    const today =
                        new Date();

                    if (
                        new Date(
                            issue.dueDate
                        ) < today
                    ) {

                        const overdueDays =
                            Math.ceil(

                                (
                                    today -
                                    new Date(
                                        issue.dueDate
                                    )
                                ) /

                                (
                                    1000 *
                                    60 *
                                    60 *
                                    24
                                )
                            );

                        myFine +=
                            calculateFine(
                                overdueDays
                            );
                    }
                }
            );

            res.status(200).json({

                availableBooks:
                    totalBooks,

                myIssuedBooks,

                myPendingFine:
                    myFine,

                myDueBooks:
                    myIssues.length
            });

        } catch (error) {

            res.status(500).json({

                message:
                    error.message
            });
        }
    };

module.exports = {

    issueBook,
    getIssuedBooks,
    returnBook,
    getOverdueBooks,
    getStudentHistory,
    getDashboardStats,
    getStudentDashboard
};