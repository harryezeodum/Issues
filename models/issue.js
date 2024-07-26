const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    username: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    likedUser: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    disLikedUser: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
})

module.exports = mongoose.model("Issue", issueSchema)