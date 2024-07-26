import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserContextProvider";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function AllUsers() {
    const userContext = useContext(UserContext);

    function deleteProfile(username) {
        userContext.deleteUser(username);
        <Navigate to="/allusers" />
    }

    const users = userContext.allUser.users.map((alluser, index) => {
        return [
            <li key={index}>
                <span className="profile">Username: </span>
                <span>{alluser.username}</span> <br /> <br />

                <span className="profile">Member Since: </span>
                <span>{alluser.memberSince.slice(0, 10)}</span> <br /> <br />

                <span className="profile">Admin User: </span>
                <span> {alluser.isAdmin ? "Yes" : "No"}</span> <br /> <br />
                <button onClick={() => deleteProfile(alluser.username)}>Delete User</button> <br /> <br />
            </li>
        ]
    });

    useEffect(() => {
        userContext.getAllUsers();
    }, [])

    return (
        <div>
            {<div className="alluser">
                <Link to="/adminsignup"><button className="button">Create an Admin Account</button></Link>
                <ol>{users}</ol>
            </div>}
        </div>
    )
}

export default AllUsers