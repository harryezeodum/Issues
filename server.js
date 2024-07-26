/* 
on render
Build Command: npm install && cd client && npm install && npm run build
Start Command: npm start
*/
const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const { expressjwt: jwt } = require("express-jwt");
const path = require("path");

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "client", "dist")));

//mongoose.connect(process.env.MONGO_URI, console.log('connected to db'));

async function connectToDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to db');
    } catch (error) {
        console.log(error);
    }
}

connectToDb();

// Routes
app.use("/api/auth", require("./routes/authRouter.js"));
app.use("/api", jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }));
app.use("/api/issue", require("./routes/issueRouter.js"));
app.use("/api/comment", require("./routes/commentRouter.js"));


// Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    if (err.name === "UnauthorizedError") {
        res.status(err.status);
    }
    return res.status(500).send(err);
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html")); });

app.listen(process.env.PORT, () => {
    console.log("connected to port" + " " + process.env.PORT);
})