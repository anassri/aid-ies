import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navigation.css';
import logo from '../images/aidies-logo.svg';
import Typography from '@material-ui/core/Typography';



export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="about-me-container">
                <h3 className="about-me-title"> About the developer</h3>
                <p className="about-me">
                    My name is Ammar Nassri, and I’m a full-stack developer, UI/UX designer, and animator. Currently living in Atlanta, GA. I love turning problems into impeccable user experience with valuable content.
                </p>
                <div className="links-container">
                    <a href="https://ammarnassri.com/" target="_blank" rel="noreferrer" className="social-link"><i className="social-media fas fa-link"></i></a>
                    <a href="https://github.com/anassri" target="_blank" rel="noreferrer" className="social-link"><i className="social-media fab fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/anassri/" target="_blank" rel="noreferrer" className="social-link"> <i className="social-media fab fa-linkedin-in"></i></a>
                    <a href="https://angel.co/u/ammar-nassri" target="_blank" rel="noreferrer" className="social-link"> <i className="social-media fab fa-angellist"></i></a>
                </div>
            </div>
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