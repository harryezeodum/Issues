import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContextProvider";

function UserIssueDetail() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const { issueId } = useParams();

    const foundIssue = userContext?.userState?.issue?.find(issue => issue._id === issueId);

    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        setEditForm({
            title: foundIssue?.title,
            description: foundIssue?.description
        });
    }, [foundIssue])

    function editFormChanges(event) {
        const { name, value } = event.target;
        setEditForm(prev => {
            return {
                ...prev, [name]: value
            }
        });
    }

    function updateIssue() {
        userContext.editIssueForm(foundIssue._id, editForm);
        setIsEdit(prev => !prev);
    }

    function cancel() {
        navigate("/userissues");
    }

    return (
        <div>
            <form className="profile-header">
                <label className="form-title">Title: </label> <br/>
                <input
                    placeholder="Title"
                    name="title"
                    value={editForm.title}
                    onChange={editFormChanges}
                    className="form-input"
                    required
                /> <br/> 

                <label htmlFor="description" className="form-title">Description: </label> <br/>
                <textarea
                    placeholder="Description"
                    name="description"
                    id="description"
                    value={editForm.description}
                    onChange={editFormChanges}
                    className="form-input"
                    required
                /> <br/> <br/>

                <button onClick={updateIssue}>Update</button> <button onClick={cancel}>Cancel</button>
            </form>
        </div>
    )
}

export default UserIssueDetail