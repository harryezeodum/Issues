import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {

    return props.token ? props.children : <Navigate to={props.reDirect} />
}
export default ProtectedRoute