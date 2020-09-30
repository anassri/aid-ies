import React, { useState } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authentication';
// import { Redirect } from 'react-router-dom';

const LoginPanel = (props) => {
    const [email, setEmail] = useState('demo@example.com');
    const [password, setPassword] = useState('password');
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user);
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(login(email, password));
    }
    const updateEmail = (e)=>{
        setEmail(e.target.value);
    }
    
    const updatePassword = (e)=>{
        setPassword(e.target.value);
    }
    
    if (user) {
        return <Redirect to="/" />
    }
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder="Email"
                    value={email}
                    onChange={updateEmail} />
                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={updatePassword}/>
                <button type="submit">Login</button>
                <NavLink to='/signup'>Don't have an account? Click here to sign up.</NavLink>
            </form>
        </main>
    )
}

export default LoginPanel;