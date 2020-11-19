import React, {  } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authentication';
import { Button } from '@material-ui/core';


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
        <Button onClick={handleLogout}>LOGOUT</Button>
    );
}

export default LogoutButton;