import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navigation.css';
import logo from '../images/aidies-logo.svg';
import Typography from '@material-ui/core/Typography';



export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="logo footer"><NavLink to="/">
                <img
                    className="footer-image"
                    src={logo}
                    alt='website footer logo'
                    width="80"
                />
            </NavLink></div>
            <Typography variant="caption" color="textSecondary" component="p" className="copyright">
                Copyright © Aidies, 2020
            </Typography>
        </footer>
    )
}