const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;

        const userExists =
            await User.findOne({ email });

        if (userExists) {

            return res.status(400).json({
                message: "User already exists"
            });
        }

        const salt =
            await bcrypt.genSalt(10);

        const hashedPassword =
            await bcrypt.hash(
                password,
                salt
            );

        await User.create({

            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message:
                "User Registered Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// LOGIN
const loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message:
                    "Invalid Email or Password"
            });
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return res.status(400).json({
                message:
                    "Invalid Email or Password"
            });
        }

        const token =
            jwt.sign(

                {
                    id: user._id,
                    role: user.role
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "7d"
                }
            );

        res.json({

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// GET ALL USERS
const getUsers = async (
    req,
    res
) => {

    try {

        const users =
            await User.find()

            .select(
                "-password"
            );

        res.status(200).json(
            users
        );

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const changePassword = async (
    req,
    res
) => {

    try {

        const {
            email,
            currentPassword,
            newPassword
        } = req.body;

        const user =
            await User.findOne({
                email
            });

        if (!user) {

            return res.status(404).json({
                message:
                    "User Not Found"
            });
        }

        const isMatch =
            await bcrypt.compare(
                currentPassword,
                user.password
            );

        if (!isMatch) {

            return res.status(400).json({
                message:
                    "Current Password Incorrect"
            });
        }

        const salt =
            await bcrypt.genSalt(10);

        user.password =
            await bcrypt.hash(
                newPassword,
                salt
            );

        await user.save();

        res.status(200).json({
            message:
                "Password Changed Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

const deleteUser = async (
    req,
    res
) => {

    try {

        const user =
            await User.findById(
                req.params.id
            );

        if (!user) {

            return res.status(404).json({
                message:
                    "User Not Found"
            });
        }

        await User.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            message:
                "User Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message:
                error.message
        });
    }
};

module.exports = {

    registerUser,

    loginUser,

    getUsers,

    deleteUser,

    changePassword
};