const express = require("express");

const router = express.Router();

const protect =require("../middleware/authMiddleware");

const authorize =require("../middleware/roleMiddleware");

const {
    registerUser,
    loginUser,
    getUsers,
    deleteUser,
    changePassword
} = require(
    "../controllers/authController"
);

router.post("/register",protect,authorize(["admin"]),registerUser);

router.post("/login",loginUser);

router.get("/users",protect,authorize(["admin"]),getUsers);

router.delete("/users/:id",protect,authorize(["admin"]),deleteUser);

router.put("/change-password",protect,authorize(["admin"]),changePassword);

router.get("/register",
    (req, res) => {

        res.send(
            "Register Route Working"
        );

    }
);

module.exports = router;