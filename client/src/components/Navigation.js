import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
function Navigation(props) {

    return (
        <nav>
            <ul>
                <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/users" activeClassName="active">Users</NavLink></li>
                <li>{props.needLogin 
                    ? <NavLink to="/login" activeClassName="active">Login</NavLink> 
                 : <LogoutButton/>} </li>
                
            </ul>
        </nav>
    )
}

export default Navigation;