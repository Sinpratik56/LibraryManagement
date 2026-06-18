const Student = require("../models/Student");

const addStudent = async (req, res) => {

    try {

        const {
            studentId,
            name,
            department,
            email,
            phone
        } = req.body;

        const studentExists =
            await Student.findOne({
                studentId
            });

        if (studentExists) {

            return res.status(400).json({
                message:
                    "Student Already Exists"
            });
        }

        const student =
            await Student.create({

                studentId,

                name,

                department,

                email,

                phone
            });

        res.status(201).json(
            student
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const getStudents = async (req, res) => {

    try {

        const students =
            await Student.find();

        res.status(200).json(
            students
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const searchStudents = async (req, res) => {

    try {

        const keyword =
            req.query.keyword;

        const students =
            await Student.find({

                name: {
                    $regex: keyword,
                    $options: "i"
                }
            });

        res.status(200).json(
            students
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const getStudentById = async (req, res) => {

    try {

        const student =
            await Student.findById(
                req.params.id
            );

        if (!student) {

            return res.status(404).json({
                message:
                    "Student Not Found"
            });
        }

        res.status(200).json(
            student
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const updateStudent = async (req, res) => {

    try {

        const student =
            await Student.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true
                }
            );

        if (!student) {

            return res.status(404).json({
                message:
                    "Student Not Found"
            });
        }

        res.status(200).json(
            student
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const deleteStudent = async (req, res) => {

    try {

        const student =
            await Student.findById(
                req.params.id
            );

        if (!student) {

            return res.status(404).json({
                message:
                    "Student Not Found"
            });
        }

        await Student.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message:
                "Student Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

module.exports = {
    addStudent,
    getStudents,
    searchStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};