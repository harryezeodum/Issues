import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserContext } from "./components/UserContextProvider";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./components/Signup";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import Profile from "./components/Profile";
import AllUsers from "./components/AllUsers";
import AllIssues from "./components/AllIssues";
import UserIssues from "./components/UserIssues";
import UserIssueDetail from "./components/UserIssueDetail";
import AddIssue from "./components/AddIssue";


function App() {
  const userContext = useContext(UserContext);

  return (
    <div>
      <Navbar />

      <Routes>
        {/* <Route path="/" element={<ProtectedRoute token={!userContext.userState.token} reDirect="/">
          <Home />
        </ProtectedRoute>} /> */}

        <Route path="/" element={<ProtectedRoute token={!userContext.userState.token} reDirect="/">
          <Home />
        </ProtectedRoute>} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/adminlogin" element={<AdminLogin />} />

        <Route path="/adminsignup" element={<ProtectedRoute token={userContext.userState.token} reDirect="/profile">
          <AdminSignup />
        </ProtectedRoute>} />

        <Route path="/profile" element={<ProtectedRoute token={userContext.userState.token} reDirect="/">
          <Profile />
        </ProtectedRoute>} />

        <Route path="/allusers" element={<ProtectedRoute token={userContext.userState.token} reDirect="/">
          <AllUsers />
        </ProtectedRoute>} />

        <Route path="/allissues" element={<ProtectedRoute token={userContext.userState.token} reDirect="/">
          <AllIssues />
        </ProtectedRoute>} />

        <Route path="/userissues" element={<ProtectedRoute token={userContext.userState.token} reDirect="/">
          <UserIssues />
        </ProtectedRoute>} />

        <Route path="/userissues/:issueId" element={<ProtectedRoute token={userContext.userState.token} reDirect="/">
          <UserIssueDetail />
        </ProtectedRoute>} />

        <Route path="/addissue" element={<ProtectedRoute token={userContext.userState.token} reDirect="/">
          <AddIssue />
        </ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
