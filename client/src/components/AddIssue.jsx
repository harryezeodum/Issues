import React, { useState, useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { useNavigate } from "react-router-dom";

function AddIssue() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const [issueForm, setIssueForm] = useState({
        title: "",
        description: ""
    })

    function issueFormChanges(event) {
        const { name, value } = event.target;
        setIssueForm(prev => {
            return {
                ...prev, [name]: value
            }
        })
    }

    function addIssue(event) {
        event.preventDefault();
        userContext.addIssue(issueForm);
        setIssueForm({
            text: "",
            description: "",
        });

        navigate("/userissues");
    }


    return (
        <div>
            <form onSubmit={addIssue} className="profile-header">
                <label className="form-title">Title:</label> <br />
                <input
                    className="form-input"
                    name="title"
                    onChange={issueFormChanges}
                    value={issueForm.title}
                    placeholder="Title"
                /> <br />

                <label className="form-title">Description:</label> <br />
                <textarea
                    className="form-input"
                    name="description"
                    onChange={issueFormChanges}
                    value={issueForm.description}
                    placeholder="Description"
                /> <br /> <br />

                <button>Add Issue</button>
            </form>
        </div>
    )
}

export default AddIssue