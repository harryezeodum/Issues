const express = require("express");
const issueRouter = express.Router();
const Issue = require("../models/issue.js");

let error;

issueRouter.route("/")
    .get(async (req, res, next) => {
        try {
            const issues = await Issue.find({});
            return res.status(200).send({ allIssues: issues });
        }
        catch (err) {
            error = err.message;
            return next(error);
        }
    })

    .post(async (req, res, next) => {
        try {
            req.body.user = req.auth._id;
            req.body.username = req.auth.username;
            const newIssue = new Issue(req.body);
            await newIssue.save();
            return res.status(201).send(newIssue);
        }
        catch (err) {
            error = err.message;
            return next(error);
        }
    })

issueRouter.route("/user")
    .get(async (req, res, next) => {
        try {
            const userIssue = await Issue.find({ user: req.auth._id });
            res.status(200).send(userIssue);
        }
        catch (err) {
            error = err;
            res.status(500).send({ err: error });
            return next(err);
        }
    });

issueRouter.route("/user/:issueId")
    .get(async (req, res, next) => {
        try {
            const issueId = req.params.issueId;
            const userIssue = await Issue.findOne({ _id: issueId, user: req.auth._id });
            return res.status(200).send(userIssue);
        }
        catch (err) {
            error = err.message;
            return next({
                err: error,
                errMsg: `issueId: ${req.params.issueId} is invalid, Please provide the valid issueId parameter`
            });
        }

    })

    .put(async (req, res, next) => {
        try {
            const issueId = req.params.issueId;
            const updatedIssue = await Issue.findOneAndUpdate({ _id: issueId, user: req.auth._id }, req.body);
            return res.status(201).send(updatedIssue);
        }
        catch (err) {
            error = err.message;
            return next({
                err: error,
                errMsg: `issueId: ${req.params.issueId} is invalid, Please provide the valid issueId parameter`
            });
        }
    })

    .delete(async (req, res, next) => {
        try {
            const issueId = req.params.issueId;
            await Issue.findOneAndDelete({ _id: issueId, user: req.auth._id });
            return res.send("Successfully deleted an issue record from the database!");
        }
        catch (err) {
            error = err.message;
            return next({
                err: error,
                errMsg: `issueId: ${req.params.issueId} is invalid, Please provide the valid issueId parameter`
            });
        }
    });

issueRouter.route("/:issueId")
    .delete(async (req, res, next) => {
        try {
            const issueId = req.params.issueId;
            await Issue.findOneAndDelete({ _id: issueId });
            return res.send("Successfully deleted an issue record from the database!");
        }
        catch (err) {
            error = err.message;
            return next({
                err: error,
                errMsg: `issueId: ${req.params.issueId} is invalid, Please provide the valid issueId parameter`
            });
        }
    });

issueRouter.route("/upvote/:issueId")
    .put(async (req, res, next) => {
        try {
            const issueId = req.params.issueId;
            const upVote = await Issue.findOneAndUpdate({ _id: issueId }, { $addToSet: { likedUser: req.auth._id }, $pull: { disLikedUser: req.auth._id } }, { new: true });
            return res.status(201).send(upVote);
        }
        catch (err) {
            error = err.message;
            return next(error);
        }
    })

issueRouter.route("/downvote/:issueId")
    .put(async (req, res, next) => {
        try {
            const issueId = req.params.issueId;
            const downVote = await Issue.findByIdAndUpdate({ _id: issueId }, { $addToSet: { disLikedUser: req.auth._id }, $pull: { likedUser: req.auth._id } }, { new: true });
            return res.status(201).send(downVote);
        }
        catch (err) {
            error = err.message;
            return next(error);
        }
    })

issueRouter.route("/username")
    .get(async (req, res, next) => {
        try {
            const searchByUserName = await Issue.find({ username: req.query.username })
            return res.status(200).send(searchByUserName);
        }
        catch (err) {
            error = err.message;
            return next(error);
        }
    })


module.exports = issueRouter