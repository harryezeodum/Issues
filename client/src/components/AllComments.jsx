import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContextProvider";

function AllComments(props) {
    const userContext = useContext(UserContext);
    const [toggle, setToggle] = useState(false);
    const [commentInput, setCommentInput] = useState({
        text: ""
    })

    function showComment() {
        setToggle(prev => !prev);
    }

    function commentChanges(event) {
        const { name, value } = event.target;
        setCommentInput(prev => {
            return {
                ...prev, [name]: value
            }
        });
    }

    const allComment = userContext.userState.comment.map((allcomment, index) => {
        return [
            <em>
                {props.issue._id === allcomment.issue && < li key={index} >
                    <span><strong>Username:</strong> {allcomment.username}</span> <br/>
                    <small> <strong>Date posted:</strong> {allcomment.createdOn.slice(0, 10) + " " + allcomment.createdOn.slice(12, 19)}</small> <br />
                    <span>{allcomment.text} </span>
                    <br /><br />
                </li >}
            </em>
        ]
    })

    function addComment(event) {
        event.preventDefault();
        userContext.addComment(props.issue._id, commentInput)
        setCommentInput({
            text: ""
        })
    }

    function upVote() {
        userContext.upVote(props.issue._id)
    }

    function downVote() {
        userContext.downVote(props.issue._id)
    }

    useEffect(() => {
        userContext.getAllComments();
    }, []);

    return (
        <ul>
            {allComment.length >= 0 && <button className="button-color" onClick={showComment}>{toggle ? "Hide Comment" : "Show Comment"}</button>} <br /> <br />
            {toggle && allComment}
            {toggle && <form onSubmit={addComment}>
                <textarea
                    name="text"
                    onChange={commentChanges}
                    value={commentInput.text}
                    placeholder="Comment"
                    required
                /> <br />
                <button className="button-color">Add Comment</button>
            </form>} <br />
            <span className="upvote">{props.issue.likedUser.length} </span> <span className="vote">{props.issue.disLikedUser.length}</span> <br />
            <button onClick={upVote} className="button-color">Upvote</button> <button onClick={downVote} className="button-color">Downvote</button> <br /> <br />
        </ul>
    )
}

export default AllComments