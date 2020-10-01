import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/authentication';

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
    
    const user = useSelector(state => state.authentication.user);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup({ firstName, lastName, email, password, confirmPassword, bio, location, website, instagram, facebook}));
    }
    
    if (user) {
        return <Redirect to="/" />
    }
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }} />
                <input type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => {
                        setlastName(e.target.value);
                    }} />
                <input type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                <input type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                    }} />
                <textarea 
                    placeholder="Enter a bio"
                    value={bio}
                    onChange={(e) => {
                        setBio(e.target.value);
                    }} />
                <input type="url"
                    placeholder="Website"
                    value={website}
                    onChange={(e) => {
                        setWebsite(e.target.value);
                    }} />
                <input type="text"
                    placeholder="Location (ex. Atlanta, GA)"
                    value={location}
                    onChange={(e) => {
                        setLocation(e.target.value);
                    }} />
                <input type="url"
                    placeholder="Instagram"
                    value={instagram}
                    onChange={(e) => {
                        setInstagram(e.target.value);
                    }} />
                <input type="url"
                    placeholder="Facebook"
                    value={facebook}
                    onChange={(e) => {
                        setFacebook(e.target.value);
                    }} />
                <button type="submit">Sign Up</button>
            </form>
        </main>
    )
}

export default SignupPanel;