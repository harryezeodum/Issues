import React, { useState, useContext } from "react";
import { UserContext } from "./UserContextProvider";

function AdminLogin() {
    const userContext = useContext(UserContext);
    const [adminLogin, setAdminLogin] = useState({
        username: "",
        password: ""
    });

    if (adminLogin.username === "" || adminLogin.password === "") {
        userContext.setErrMsg("");
    }

    function adminLoginChanges(event) {
        const { name, value } = event.target;
        setAdminLogin(prev => {
            return {
                ...prev, [name]: value
            }
        })
    }

    function adminUser(event) {
        event.preventDefault();
        userContext.adminLogin(adminLogin);
    }

    return (
        <div>
            <form className="form" onSubmit={adminUser}>
                <h2>Admins</h2>
                <span className="error">{userContext.errMsg}</span>
                <label className="label">Username: </label>
                <input
                    name="username"
                    placeholder="Username"
                    onChange={adminLoginChanges}
                    value={adminLogin.username}
                />

                <label className="label">Password: </label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={adminLoginChanges}
                    value={adminLogin.password}
                />

                <button>Login</button>
            </form>

        </div>
    )
}

export default AdminLogin