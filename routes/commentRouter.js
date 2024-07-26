const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/comment.js");

let error;
commentRouter.route("/")
    .get(async (req, res, next) => {
        try {
            const comment = await Comment.find({});
            return res.status(200).send(comment);
        }
        catch (err) {
            error = err.message;
            return next(error);
        }
    })

commentRouter.route("/:issueId")
    .post(async (req, res, next) => {
        try {
            const issueId = req.params.issueId;
            req.body.user = req.auth._id;
            req.body.issue = issueId;
            req.body.username = req.auth.username;

            const newComment = new Comment(req.body);
            await newComment.save();
            return res.status(201).send(newComment);
        }
        catch (err) {
            error = err.message;
            return next(error);
        }
    })

module.exports = commentRouter