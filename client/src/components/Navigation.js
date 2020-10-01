import React from 'react';
import '../css/navigation.css';
import logo from '../images/aidies-logo.svg';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import {Button} from '@material-ui/core';

function Navigation(props) {

    return (
        <nav className="nav-main">
            <div className="navigation-container">
                <div className="nav-button">
                    <div className="nav-icon"><i className="fas fa-plus"></i></div>
                    <NavLink to="/campaign/create" activeClassName="active"><Button>START A CAMPAIGN</Button></NavLink>
                </div>
                <div className="logo"><NavLink to={`/`}>
                    <img
                        className="nav-image"
                        src={logo}
                        alt='website logo'
                        width="125"
                    />
                </NavLink></div>
                <div className="nav-right-buttons">
                    <div className="nav-button">
                        <div className="nav-icon"><i className="fas fa-search"></i></div>
                        <NavLink to="/search" activeClassName="active"><Button>SEARCH</Button></NavLink>
                    </div>
                    <div className="nav-button right" >
                        <div className="nav-icon"><i className="fas fa-sign-in-alt"></i></div>
                    {props.needLogin 
                            ? <NavLink to="/login" activeClassName="active"><Button>LOGIN</Button></NavLink> 
                    : <LogoutButton/>} </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;