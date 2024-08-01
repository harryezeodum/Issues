import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

function UserContextProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        issue: [],
        comment: JSON.parse(localStorage.getItem("comments")) || [],
        allissues: JSON.parse(localStorage.getItem("allIssues")) || []
    };

    const [userState, setUserState] = useState(initState);

    const [allUser, setAllUser] = useState([{
        users: JSON.parse(localStorage.getItem("users")) || []
    }]);

    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    function adminSignup(credentials) {
        axios.post("/api/auth/signup", credentials)
            .then(response => {
                console.log(response.data);
                // navigate("/allusers");
                getAllIssues();
            })
            .catch(err => setErrMsg(err.response.data.errMsg));
    }

    function signup(credentials) {
        axios.post("/api/auth/signup", credentials)
            .then(response => {
                const { user, token, isAdmin } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                setUserState(prev => {
                    return {
                        ...prev, user, token
                    }
                });

                if (token && !isAdmin) {
                    navigate("/profile");
                    getUserIssues();
                }
            })
            .catch(err => setErrMsg(err.response.data.errMsg));
    }

    function adminLogin(credentials) {
        axios.post("/api/auth/login", credentials)
            .then(response => {
                const { user, token, user: { isAdmin } } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                setUserState(prevUser => {
                    return {
                        ...prevUser, user, token
                    }
                })
                if (token && isAdmin) {
                    getAllIssues();
                    getUserIssues();
                    getAllUsers();
                    navigate("/profile");

                }
                else {
                    setUserState({
                        token: ""
                    })
                    setErrMsg("You are not an Admin, please login as a standard user");
                }
            })
            .catch(err => setErrMsg(err.response.data.errMsg));
    }

    function login(credential) {
        axios.post("/api/auth/login", credential)
            .then(response => {
                const { user, token, user: { isAdmin } } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                setUserState(prevUser => {
                    return {
                        ...prevUser, user, token
                    }
                })

                if (token && !isAdmin) {
                    navigate("/profile");
                    getAllIssues();
                    getUserIssues();
                }
                else {
                    setUserState({
                        token: ""
                    })
                    setErrMsg("Please login as Admin on home page");
                }
            })
            .catch(err => setErrMsg(err.response.data.errMsg));
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("users");
        localStorage.removeItem("allIssues");
        localStorage.removeItem("comments");

        setUserState({
            user: {},
            token: "",
            billtracker: [],
            allissues: [],
            comment: []
        });
    }

    function getAllUsers() {
        userAxios.get("/api/auth/allusers")
            .then(response => {
                const { users } = response.data;
                localStorage.setItem("users", JSON.stringify(users));
                setAllUser(prev => {
                    return {
                        ...prev, users
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getUser(username) {
        userAxios.get(`/api/auth/allusers/${username}`)
            .then(response => {
                setUserState(prev => {
                    return {
                        ...prev, user: response.data
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))

    }

    function getUserIssues() {
        userAxios.get("/api/issue/user")
            .then(response => {
                setUserState(prev => {
                    return {
                        ...prev, issue: response.data
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))

    }

    function getUserIssue(id) {
        userAxios.get(`/api/issue/user/${id}`)
            .then(response => {
                setUserState(prev => {
                    return {
                        ...prev, issue: response.data
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))

    }

    function getAllIssues() {
        userAxios.get("/api/issue")
            .then(response => {
                const { allIssues } = response.data;
                localStorage.setItem("allIssues", JSON.stringify(allIssues));
                setUserState(prev => {
                    return {
                        ...prev, allissues: allIssues
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function getAllComments() {
        userAxios.get("/api/comment")
            .then(response => {
                const { comments } = response.data;
                localStorage.setItem("comments", JSON.stringify(comments));
                setUserState(prev => {
                    return {
                        ...prev, comment: comments
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))
    }

    function addIssue(issue) {
        userAxios.post("/api/issue", issue)
            .then(response => {
                setUserState(prev => {
                    return {
                        ...prev, issue: [...prev.issue, response.data]
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg));
    }

    function upVote(issueId) {
        userAxios.put(`/api/issue/upvote/${issueId}`)
            .then(response => {
                getAllIssues();
                setUserState(prev => {
                    return {
                        ...prev, issue: response.data
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg));
    }

    function downVote(issueId) {
        userAxios.put(`/api/issue/downvote/${issueId}`)
            .then(response => {
                getAllIssues();
                setUserState(prev => {
                    return {
                        ...prev, issue: response.data
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg));
    }

    function addComment(issueId, update) {
        userAxios.post(`/api/comment/${issueId}`, update)
            .then(response => {
                setUserState(prev => {
                    return {
                        ...prev, comment: [...prev.comment, response.data]
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg));
    }

    function editIssueForm(id, update) {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        userAxios.put(`/api/issue/user/${id}`, update)
            .then(response => {
                setUserState(prev => {
                    return {
                        ...prev, issue: prev.issue.map(issue => issue._id === id ? response.data : issue)
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))

        if (token && !user.isAdmin) {
            getUserIssues();
            getAllIssues();
            navigate(`/userissues`);
        }
        else if (token && user.isAdmin) {
            getUserIssues();
            getAllIssues();
            navigate(`/userissues`);
        }
    }

    function editProfileForm(username, update) {
        userAxios.put(`/api/auth/allusers/${username}`, update)
            .then(response => {
                getUser(username);
                setUserState(prev => {
                    return {
                        ...prev, user: response.data
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))

        navigate("/profile");
    }

    function editPassword(username, update) {
        userAxios.put(`/api/auth/password/${username}`, update)
            .then(response => {
                getUser(username);
                setUserState(prev => {
                    return {
                        ...prev, user: response.data
                    }
                })
            })
            .catch(err => console.log(err.response.data.errMsg))

        navigate("/profile");
    }

    function deleteIssue(id) {
        userAxios.delete(`/api/issue/user/${id}`)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
        getUserIssues();
    }

    function AdminDelete(id) {
        userAxios.delete(`/api/issue/${id}`)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
        getAllIssues();
        //navigate("/allissues");
    }

    function deleteUser(username) {
        userAxios.delete(`/api/auth/allusers/${username}`)
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
        getAllUsers();
    }

    return (
        <UserContext.Provider value={{
            ...userState,
            allUser,
            errMsg,
            userState,
            adminSignup,
            signup,
            adminLogin,
            login,
            logout,
            getAllUsers,
            getUser,
            getUserIssues,
            getUserIssue,
            getAllIssues,
            addIssue,
            upVote,
            downVote,
            addComment,
            editIssueForm,
            editProfileForm,
            editPassword,
            deleteIssue,
            deleteUser,
            AdminDelete,
            setErrMsg,
            getAllComments
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContextProvider, UserContext }
