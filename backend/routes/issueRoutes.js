const express =require("express");

const router =express.Router();

const protect =require("../middleware/authMiddleware");

const authorize =require("../middleware/roleMiddleware");

const {
    issueBook,
    getIssuedBooks,
    returnBook,
    getOverdueBooks,
    getStudentHistory,
    getDashboardStats,
    getStudentDashboard
} = require("../controllers/issueController");

router.post("/",protect,authorize("Admin"),issueBook);

router.get("/",protect,getIssuedBooks);

router.get("/overdue",protect,getOverdueBooks);

router.get("/dashboard/stats",protect,getDashboardStats);

router.get("/student-dashboard/:studentId",protect,getStudentDashboard);

router.get("/student/:studentId",protect,getStudentHistory);

router.put("/return/:id",protect,authorize("Admin"),returnBook);

module.exports = router;