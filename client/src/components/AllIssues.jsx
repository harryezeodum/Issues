import React, { useEffect, useContext } from "react";
import { UserContext } from "./UserContextProvider";
import AllComments from "./AllComments";
import { Navigate } from "react-router-dom";

function AllIssues() {
    const userContext = useContext(UserContext);

    function addIssue() {
        <Navigate to="/addissue" />
    }

    function adminDeleteIssue(id) {
        userContext.AdminDelete(id);
        <Navigate to="/allissues"/>
    }

    const allIssues = userContext.userState.allissues.map((allissue, index) => {
        return [
            <>
                <li className="" key={index} >
                    <span > <strong>Username: </strong></span>
                    <span>{allissue.username}</span> <br />
                    <span > <strong>Title: </strong></span>
                    <span>{allissue.title}</span> <br />
                    <span > <strong>Description: </strong></span>
                    <span> {allissue.description}</span> <br/> <br />
                    <AllComments issue={allissue} />
                    {userContext.userState.user.isAdmin && <button onClick={() => adminDeleteIssue(allissue._id)} className="button-color">Delete Issue</button>}
                    <hr />

                </li>
            </>

        ]
    });

    useEffect(() => {
        userContext.getAllIssues();
    }, []);

    return (
        <div>
            <div className="allissuelist">
            <button onClick={addIssue} className="allissuelist-button">Add an Issue</button>
                {allIssues.length > 0 && <h2 className="allissue-title ">All Issues</h2>} <hr />
                <ul>
                    {allIssues.length > 0 ? allIssues : <h2>There is currently no Issue posted.</h2>}
                </ul>
            </div>
        </div>
    )
}
//

export default AllIssues