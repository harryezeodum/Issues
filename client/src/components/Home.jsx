import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContextProvider";


function Home() {
    const userContext = useContext(UserContext);

    const [login, setLogin] = useState({
        username: "",
        password: ""
    })

    if (login.username === "" || login.password === "") {
        userContext.setErrMsg("");
    }

    function loginChanges(event) {
        const { name, value } = event.target;
        setLogin(prev => {
            return {
                ...prev, [name]: value
            }
        })
    }

    function loginUser(event) {
        event.preventDefault();
        userContext.login(login);
    }

    return (
        <div>
            <form className="form" onSubmit={loginUser}>
                <h2>Log into your account to view All Issues or My Issues</h2>
                <span className="error">{userContext.errMsg}</span>
                <label className="label">Username: </label>
                <input
                    name="username"
                    placeholder="Username"
                    onChange={loginChanges}
                    value={login.username}
                />

                <label className="label">Password: </label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={loginChanges}
                    value={login.password}
                />

                <button>Login</button>
                <span>Don't have an account <Link to="/signup" ><span className="form-signup">Signup</span></Link></span>
                <span>Admin Login <Link to="/adminlogin" ><span className="form-signup">Here</span></Link></span>
            </form>

        </div>
    )
}

export default Home
