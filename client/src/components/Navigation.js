import React, { useState } from 'react';
import '../css/navigation.css';
import logo from '../images/aidies-logo.svg';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { Button, InputBase} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { searchCampaigns, getCampaigns } from '../store/campaign';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function Navigation(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const history = useHistory();
    
    const handleSearch = (e) => {
        e.preventDefault()
        console.log(keyword);
        if(!keyword){
            dispatch(getCampaigns());
        } else  dispatch(searchCampaigns(keyword));
        history.push('/');
    }
    return (
        <nav className="nav-main">
            
            <div className="navigation-container">
                <div className="nav-left-buttons">
                    <div className="nav-button">
                        <div className="nav-icon"><i className="fas fa-plus"></i></div>
                        <NavLink to="/campaign/create" activeClassName="active"><Button>START A CAMPAIGN</Button></NavLink>
                    </div>
                    <div className="nav-button dashboard-btn">
                        <div className="nav-icon"><i className="fas fa-user"></i></div>
                        <NavLink to="/dashboard" activeClassName="active"><Button>dashboard</Button></NavLink>
                    </div>
                </div>
                <div className="logo"><NavLink to="/">
                    <img
                        className="nav-image"
                        src={logo}
                        alt='website logo'
                        width="125"
                    />
                </NavLink></div>
                <div className="nav-right-buttons">
                    <div className="nav-button">
                        {/* <div className="nav-icon"><i className="fas fa-search"></i></div> */}
                        {/* <NavLink to="/search" activeClassName="active"><Button>SEARCH</Button></NavLink> */}
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <div className="nav-icon"><i className="fas fa-search"></i></div>
                            </div>
                            <form onSubmit={handleSearch}>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                value={keyword}
                                onChange={e => setKeyword(e.target.value)}
                            />
                            </form>
                        </div>
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