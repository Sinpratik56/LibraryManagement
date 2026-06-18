const express = require("express");

const router =
    express.Router();

const protect = require( "../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const {
    addStudent,
    getStudents,
    searchStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require(
    "../controllers/studentController"
);


router.post("/",protect,authorize(["Admin"]),addStudent);

router.get("/",protect,getStudents);

router.get("/search",protect,searchStudents);

router.get("/:id",protect,getStudentById);

router.put("/:id",protect,authorize("Admin"),updateStudent);

router.delete("/:id",protect,authorize("Admin"),deleteStudent);

module.exports = router;