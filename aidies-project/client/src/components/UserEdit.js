import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editUser} from '../store/authentication';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Grid, TextField } from '@material-ui/core';
import '../css/campaign.css';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    form: {
        width: 700,
    },
    input: {
        display: 'none',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        backgroundColor: '#222',
        color: '#fff',
        textAlign: 'right',
    },
    formControl: {
        minWidth: 502,
    },
    inputLabel: {
        paddingTop: -5,
        paddingLeft: 14,
    },
    adjFields:{
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',

    }
}));
const UserEdit = () => {
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
    const [submitted, setSubmitted] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();

    const user = useSelector(state => state.authentication.user);
    const id = useSelector(state => state.authentication.user.id);
    const errors = useSelector(state => state.authentication.errors);

    useEffect(() => {
        setFirstName(user.firstName);
        setlastName(user.lastName);
        setEmail(user.email);
        setLocation(user.location);
        setBio(user.bio);
        setWebsite(user.website);
        setInstagram(user.instagram);
        setFacebook(user.facebook);
    }, [user]);

    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(editUser({ firstName, lastName, email, password, confirmPassword, bio, location, website, instagram, facebook, id }))
        setSubmitted(true);
    }
    return (
        <div className={classes.form}>
            <Typography component="h1" variant="h5" className="campaign-title">
                Edit User
            </Typography>

            <form className={classes.form} noValidate onSubmit={handleEdit}>
                {(submitted)
                ? <Alert variant="outlined" severity="success" style={{ marginBottom: 15 }}> Information Changed</Alert>
                : null}
                {/* {(errors !== undefined && errors.length)
                    ? <Alert variant="outlined" severity="error" style={{ marginBottom: 15 }}>
                        {errors.map((error, i) => <li key={i} className="error-list-item">{error}</li>)}
                    </Alert>
                    : null} */}
                <Grid container spacing={2} direction="column">
                    <div className={classes.adjFields}>
                        <Grid item xs={12} sm={6} >
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
                        <Grid item xs={12} sm={6} style={{ marginLeft: 12}}>
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
                    </div>
                    <Grid item xs={12} sm={12}>
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
                    <div className={classes.adjFields}>
                        <Grid item xs={12} sm={6}>
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
                        <Grid item xs={12} sm={6} style={{ marginLeft: 12 }}>
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
                    </div>
                    <Grid item xs={12} sm={12}>
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
                    <Grid item xs={12} sm={12}>
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
                    <Grid item xs={12} sm={12}>
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
                    <div className={classes.adjFields}>
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
                        <Grid item xs={12} sm={6} style={{ marginLeft: 12 }}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="facebook"
                                label="Facebook"
                                type="url"
                                id="facebook"
                                autoComplete="facebook"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                            />
                        </Grid>
                    </div>
                    <Grid item xs={12} sm={12}>
                        <Button type="submit" size="large" variant="contained" className={classes.button} >
                            Submit Change
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </div>
    )
}


export default UserEdit;