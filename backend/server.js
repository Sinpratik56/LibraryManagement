const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const bookRoutes = require("./routes/bookRoutes");
const studentRoutes = require("./routes/studentRoutes");
const issueRoutes = require("./routes/issueRoutes");
dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/students",studentRoutes);

app.use("/api/issues",issueRoutes);

app.get("/", (req, res) => {

    res.send(
        "Library Management API Running"
    );

});

const PORT = process.env.PORT || 5000;
app.use(
    "/api/auth",
    authRoutes
);
app.use(
    "/api/books",
    bookRoutes
);
app.use(
    "/api/test",
    testRoutes
);
app.get("/test", (req, res) => {
    res.send("Test Route Working");
});

app.listen(PORT, () => {

    console.log(
        `Server Running On Port ${PORT}`
    );

});