import React, { useState, useContext } from "react";
import { UserContext } from "./UserContextProvider";

function AdminSignup() {
    const userContext = useContext(UserContext);
    const [adminsignup, setAdminSignup] = useState({
        username: "",
        password: "",
        isAdmin: true,
        email: ""
    });

    if (adminsignup.username === "" || adminsignup.password === "") {
        userContext.setErrMsg("");
    }

    function adminSignupChanges(event) {
        const { name, type, checked, value } = event.target;
        setAdminSignup(prev => {
            return {
                ...prev, [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function adminSignup(event) {
        event.preventDefault();
        userContext.adminSignup(adminsignup);
    }

    return (
        <div>
            <form className="form" onSubmit={adminSignup}>
                <h2>Create an Admin Account</h2>
                <span className="error">{userContext.errMsg}</span>
                <label className="label">Username: </label>
                <input
                    name="username"
                    placeholder="Username"
                    onChange={adminSignupChanges}
                    value={adminsignup.username}
                />

                <label className="label">Password: </label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={adminSignupChanges}
                    value={adminsignup.password}
                />

                <label className="label">Email: </label>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={adminSignupChanges}
                    value={adminsignup.email}
                />

                <label className="label">isAdmin: </label>
                <input
                    type="checkbox"
                    name="isAdmin"
                    onChange={adminSignupChanges}
                    checked={adminsignup.isAdmin}
                />

                <button>Submit</button>
            </form>

        </div>
    )
}

export default AdminSignup