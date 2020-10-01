import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
function Navigation(props) {

    return (
        <nav>
            <ul>
                <li><NavLink to="/" activeClass="active">Home</NavLink></li>
                <li><NavLink to="/users" activeClass="active">Users</NavLink></li>
                <li>{props.needLogin 
                 ? <NavLink to="/login" activeClass="active">Login</NavLink> 
                 : <LogoutButton/>} </li>
                
            </ul>
        </nav>
    )
}

export default Navigation;