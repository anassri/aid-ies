import React, { useEffect, useState } from 'react';
import '../css/navigation.css';
import logo from '../images/aidies-logo.svg';
import { NavLink, useHistory, useLocation, Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { Button, InputBase} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { searchCampaigns, getCampaigns, getCategories, filterCampaigns } from '../store/campaign';


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

function Navigation() {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState('');
    const history = useHistory();
    const location = useLocation();

    const [selected, setSelected] = useState('');

    const categories = useSelector(state => state.campaign.categories);
    const needLogin = useSelector(state => !state.authentication.user.id);

    useEffect(()=>{
        dispatch(getCategories());
    }, [])

    const handleFilter = e => {
        if(!selected || selected !== e.target.innerHTML){
            dispatch(filterCampaigns(e.target.innerHTML));
            setSelected(e.target.innerHTML);
        } else if (selected === e.target.innerHTML){
            dispatch(getCampaigns());
            setSelected('');
        }
    }
    const handleSearch = (e) => {
        e.preventDefault()
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
                            {needLogin 
                            ? <NavLink to="/login" activeClassName="active"><Button>LOGIN</Button></NavLink> 
                            : <LogoutButton/>} 
                        </div>
                </div>
            </div>
            <div className={location.pathname === '/' ? "category-filter" : "back-button-container"}>
                {location.pathname === '/'
                    ? categories.map(category => <div key={category.id} className="category-button"><Button onClick={handleFilter}>{category.name}</Button></div>)
                    : <div className="nav-icon"><Link to='/' className="back-button-icon"><i className="fas fa-long-arrow-alt-left fa-2x back-icon"></i><Button>Go back</Button></Link></div>}

            </div>
        </nav>
    )
}

export default Navigation;