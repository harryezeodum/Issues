import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContextProvider";

function Navbar() {
    const userContext = useContext(UserContext);

    return (
        <nav className="navbar">
            {!userContext.userState.token &&<Link to="/"><h2 className="navbar-title">Home</h2><hr /></Link> } 
            {userContext.userState.token && <Link to="/profile"><h2 className="navbar-title">Profile</h2><hr /></Link>} 
            {userContext.userState.token && userContext.userState.user.isAdmin && <Link to="/allusers"><h2 className="navbar-title">All Users</h2> <hr /></Link>} 
            {userContext.userState.token && <Link to="/allissues"><h2 className="navbar-title">All Issues</h2><hr /></Link>} 
            {userContext.userState.token && <Link to="/userissues"><h2 className="navbar-title">My Issues</h2><hr /></Link>} 
            {userContext.userState.token && <Link to="/"><h2 onClick={userContext.logout} className="navbar-title">Log out</h2><hr /></Link>} 
        </nav>
    )
}
export default Navbar