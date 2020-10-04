import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/authentication';
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  fade
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    TextField: {
        border: '1px solid #666',  
    },
    '&$focused': {
        backgroundColor: '#fff',
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: '#333',
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        
    },
    submit: {
        margin: theme.spacing(3, 1, 2),
        backgroundColor: '#222',
        color: '#fff',
    },
    link: {
      color: '#222',
    }
}));

const SignupPanel = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [website, setWebsite] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    
    const classes = useStyles();
    const user = useSelector(state => state.authentication.user.id);
    const errors = useSelector(state => state.authentication.errors);

    const dispatch = useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup({ firstName, lastName, email, password, confirmPassword, bio, location, website, instagram, facebook}));
    }
    
    if (user) {
        return <Redirect to="/" />
    }
        return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
                        Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          {errors.length
                  ? <Alert variant="outlined" severity="error" style={{ marginBottom: 15 }}>
              {errors.map((error, i) => <li key={i} className="error-list-item">{error}</li>)}
            </Alert>
            : null}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="confirm-current-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="location"
                label="Location (ex. Atlanta, GA, USA)"
                type="text"
                id="location"
                autoComplete="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                label="Biorgraphy"
                name="biography"
                fullWidth
                required
                multiline
                rows={4}
                autoComplete="biography"
                id="outlined-multiline"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="website"
                label="Website"
                type="url"
                id="website"
                autoComplete="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                name="instagram"
                label="Instagram"
                type="url"
                id="instagram"
                autoComplete="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                name="facebook"
                label="Facebook"
                type="url"
                id="facebook"
                autoComplete="facebook"
                value={instagram}
                onChange={(e) => setFacebook(e.target.value)} 
              />
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2" className={classes.link}>
                {"Already have an account? Sign in"}
              </Link>
            </Grid>
          </Grid>
        </Grid>
        </form>
      </div>
        </Container>

    )
}

export default SignupPanel;