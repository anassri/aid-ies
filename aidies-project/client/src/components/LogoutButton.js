import React, {  } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authentication';


const LogoutButton = () => {
    const loggedOut = useSelector(state => !state.authentication.user);
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(logout())
    };
    
    if (loggedOut) {
        return <Redirect to="/login" />
    }
    return (
        <a href='' onClick={handleLogout}>Logout</a>
    );
}

export default LogoutButton;