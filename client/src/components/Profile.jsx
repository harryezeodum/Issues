import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContextProvider";

function Profile() {
    const userContext = useContext(UserContext);
    const [password, setPassword] = useState({});
    const [editProfile, setEditProfile] = useState({});

    useEffect(() => {
        setEditProfile({
            username: userContext.user.username,
            email: userContext.user.email,
            memberSince: userContext.user.memberSince.slice(0, 10),
            isAdmin: userContext.user.isAdmin
        })

    }, []);

    const [isPasswordEdit, setIsPasswordEdit] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    function edit() {
        setIsEdit(prev => !prev);
    }

    function cancelEdit() {
        setIsEdit(prev => !prev)
    }

    function editPassword() {
        setIsPasswordEdit(prev => !prev);
    }

    function cancelPasswordEdit() {
        setIsPasswordEdit(prev => !prev)
    }


    function editProfileChanges(event) {
        const { name, type, checked, value } = event.target;
        setEditProfile(prev => {
            return {
                ...prev, [name]: type === "checkbox" ? checked : value
            }
        });
    }

    function editPasswordChanges(event) {
        const { name, type, checked, value } = event.target;
        setPassword(prev => {
            return {
                ...prev, [name]: type === "checkbox" ? checked : value
            }
        });
    }

    function updateProfile() {
        userContext.editProfileForm(userContext.user.username, editProfile);
        setIsEdit(prev => !prev);
    }

    function updatePassword() {
        userContext.editPassword(userContext.user.username, password);
        setIsPasswordEdit(prev => !prev);
    }

    return (
        <div>
            <h2 className="welcome">Welcome {userContext.userState.user.username.toUpperCase()}!</h2>
            {!isEdit && !isPasswordEdit && <div className="profile-header">
                <span className="profile">Username: </span>
                <span>{userContext.user.username}</span> <br /> <br />

                <span className="profile">Email: </span>
                <span>{userContext.user.email}</span> <br /> <br />


                <span className="profile">Member since: </span>
                <span>{userContext.user.memberSince.slice(0, 10)}</span> <br /> <br />


                <span className="profile">Admin user: </span>
                <span>{userContext.user.isAdmin ? "Yes" : "No"}</span> <br /> <br />

                <button onClick={edit}>Edit Email</button> <button onClick={editPassword}>Edit Password</button>
            </div>}

            {isPasswordEdit && <form className="profile-header">
                <label className="form-title">Password:</label> <br />
                <input
                    className="form-input"
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    onChange={editPasswordChanges}
                    value={password.password}
                    required
                /> <br />

                <button onClick={updatePassword}>Update Password</button> <button onClick={cancelPasswordEdit}>Cancel</button>
            </form>}

            {isEdit && <form className="profile-header">
                <label className="form-title">UserName:</label> <br />
                <input
                    className="form-input"
                    name="username"
                    onChange={editProfileChanges}
                    value={editProfile.username}
                    required
                    readOnly
                /> <br />

                <label className="form-title">Email:</label> <br />
                <input
                    className="form-input"
                    name="email"
                    type="email"
                    onChange={editProfileChanges}
                    value={editProfile.email}
                    required
                /> <br />

                <label className="form-title">Member since:</label> <br />
                <input
                    className="form-input"
                    name="memberSince"
                    onChange={editProfileChanges}
                    value={editProfile.memberSince.slice(0, 10)}
                    required
                    readOnly
                /> <br />

                <label className="form-title">Admin User:</label> <br />
                <input
                    className="form-input"
                    name="isAdmin"
                    onChange={editProfileChanges}
                    value={editProfile.isAdmin ? "Yes" : "No"}
                    required
                    readOnly
                />  <br />

                <button onClick={updateProfile}>Update</button> <button onClick={cancelEdit}>Cancel</button>

            </form>}
        </div>
    )
}

export default Profile