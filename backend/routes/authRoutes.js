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

router.post("/register",protect,authorize("Admin"),registerUser);

router.post("/login",loginUser);

router.get("/users",protect,authorize("Admin"),getUsers);

router.delete("/users/:id",protect,authorize("Admin"),deleteUser);

router.put("/change-password",protect,changePassword);

router.get("/register",
    (req, res) => {

        res.send(
            "Register Route Working"
        );

    }
);

module.exports = router;