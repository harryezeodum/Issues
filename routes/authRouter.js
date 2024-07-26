const express = require("express");
const authRouter = express.Router();
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let error;

//signup
authRouter.route("/signup")
    .post(async (req, res, next) => {
        try {
            const user = await User.findOne({ username: req.body.username.toLowerCase() });

            if (user) {
                res.status(403)
                error = { errMsg: "Username already exists" };
                return next(error);
            }
            else {
                const newUser = new User(req.body);
                await newUser.save();
                const token = jwt.sign(newUser.withoutPassword(), process.env.SECRET)
                return res.status(201).send({ token, user: newUser.withoutPassword() });
            }
        }
        catch (err) {
            error = err.message;
            return next(error);
        }
    })

//Login
authRouter.route("/login")
.post(async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username.toLowerCase() });

        if (!user) {
            res.status(403)
            error = { errMsg: "Username or Password is incorrect" };
            return next(error);
        }

        user.checkPassword(req.body.password, (err, isMatch) => {
            if (err) {
                res.status(403)
                error = { errMsg: "Username or Password is incorrect" };
                return next(error);
            }
            if (!isMatch) {
                res.status(403)
                error = { errMsg: "Username or Password is incorrect" };
                return next(error);
            }
            else {
                const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
                return res.status(200).send({ token, user: user.withoutPassword() });
            }
        });

    }

    catch (err) {
        error = err.message;
        return next(error);
    }
});

//Get all Users
authRouter.route("/allusers")
    .get(async (req, res, next) => {
        try {
            const allUsers = await User.find({});
            return res.status(200).send({ users: allUsers });
        }
        catch (err) {
            error = err.message;
            return next(error);
        }
    });

authRouter.route("/allusers/:userId")
    .get(async (req, res, next) => {
        try {
            const userId = req.params.userId;
            const user = await User.findOne({ username: userId });
            return res.status(200).send(user);
        }
        catch (err) {
            error = err.message;
            return next({
                err: error,
                errMsg: `User: ${req.params.userId} is invalid, Please provide the valid user ID parameter`
            });
        }

    })

    .put(async (req, res, next) => {
        try {
            // const salt = await bcrypt.genSalt(10);
            // const encryptedPassword = await bcrypt.hash(req.body.password, salt);
            // req.body.password = encryptedPassword;
            const userId = req.params.userId;
            const updatedUser = await User.findOneAndUpdate({ username: userId }, req.body);
            return res.status(201).send(updatedUser);
        }
        catch (err) {
            error = err.message;
            return next({
                err: error,
                errMsg: `User: ${req.params.userId} is invalid, Please provide the valid user ID parameter`
            });
        }
    })

    .delete(async (req, res, next) => {
        try {
            const userId = req.params.userId;
            await User.findOneAndDelete({ username: userId });
            return res.send("Successfully deleted a user from the database!");
        }
        catch (err) {
            error = err.message;
            return next({
                err: error,
                errMsg: `User: ${req.params.userId} is invalid, Please provide the valid user ID parameter`
            });
        }
    });

authRouter.route("/password/:user")
    .put(async (req, res, next) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = encryptedPassword;
            const user = req.params.user;
            const updatedUser = await User.findOneAndUpdate({ username: user }, req.body);

            return res.status(201).send(updatedUser);
        }
        catch (err) {
            error = err.message;
            return next(error);
        }
    });

module.exports = authRouter