import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContextProvider";

function Signup() {
    const userContext = useContext(UserContext)
    const [signup, setSignup] = useState({
        username: "",
        password: "",
        email: ""
    });

    if (signup.username === "" || signup.password === "") {
        userContext.setErrMsg("");
    }

    function signupChanges(event) {
        const { name, value } = event.target;
        setSignup(prev => {
            return {
                ...prev, [name]: value
            }
        })
    }

    function userSignup(event) {
        event.preventDefault();
        userContext.signup(signup);
    }

    return (
        <div>
            <form className="form" onSubmit={userSignup}>
                <h2>Create an account</h2>
                <span className="error">{userContext.errMsg}</span>
                <label className="label">Username: </label>
                <input
                    name="username"
                    placeholder="Username"
                    onChange={signupChanges}
                    value={signup.username}
                />

                <label className="label">Password: </label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={signupChanges}
                    value={signup.password}
                />

                <label className="label">Email: </label>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={signupChanges}
                    value={signup.email}
                />

                <button>Signup</button>
                <span>Have an account <Link to="/" ><span className="form-signup">Login</span></Link></span>
            </form>

        </div>
    )
}

export default Signup