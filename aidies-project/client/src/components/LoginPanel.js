import React, { useState } from 'react';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authentication';

import {Button, 
        CssBaseline, 
        TextField, 
        Link, 
        Grid, 
        Typography, 
        Container} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#222',
        color: '#fff',
    },
    link: {
        color: '#222',
    }
}));

const LoginPanel = (props) => {
    const [email, setEmail] = useState('demo@example.com');
    const [password, setPassword] = useState('password');
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user.id);
    const location = useSelector(state => state.campaign.previousLocation);
    const history = useHistory();
    const classes = useStyles();

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(login(email, password));
    }
    if (user!== null) {
        if(!location){
            return <Redirect to="/" />
        }
        return <Redirect to={location} />
    }
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            
            <Typography component="h1" variant="h5">
                        Login
            </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                        onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                        onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
            >
                            Login
            </Button>
            <Grid container>
                <Grid item>
                    <Link href='/signup' variant="body2" className={classes.link}>
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
            </form>
        </div>
    </Container>
        
        
    )
}

export default LoginPanel;