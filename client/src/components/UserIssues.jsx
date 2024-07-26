import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserContextProvider";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserIssues() {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    function userIssueDetail(id) {
        navigate(`/userissues/${id}`);
        userContext.getUserIssues();
    }

    function addIssue() {
        <Navigate to="/addissue" /> 
    }

    function deleteUserIssue(id) {
        userContext.deleteIssue(id);
        <Navigate to="/userissue" />
    }

    const userIssues = userContext.userState.issue.map((userissue, index) => {
        return [
            <>
                <li className="" key={index} >
                    <span > <strong>Title: </strong></span>
                    <span>{userissue.title}</span> <br />

                    <span > <strong>Description: </strong></span>
                    <span> {userissue.description}</span> <br /> <br />

                    <button className="userissue" onClick={() => userIssueDetail(userissue._id)}>Edit Issue</button> <button className="userissue" onClick={() => deleteUserIssue(userissue._id)}>Delete Issue</button>
                    <hr />
                </li>
            </>

        ]
    });

    useEffect(() => {
        userContext.getUserIssues();
    }, []);

    return (
        <div>
            <div className="allissuelist">
            <button onClick={addIssue} className="allissuelist-button">Add an Issue</button>
                {userIssues.length > 0 && <h2 className="allissue-title ">My Issues</h2>} <hr/>
                <ul>
                    {userIssues.length > 0 ? userIssues : <h2>You currently do not have any issue.</h2>}
                </ul>
            </div>
        </div>
    )
}

export default UserIssues