const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    issue: {
        type: Schema.Types.ObjectId,
        ref: "Issue",
        required: true
    },
    username: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Comment", commentSchema)