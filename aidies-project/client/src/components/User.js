import React from 'react';


function User(props) {
    return (
        <>
            <strong>First Name:</strong> {props.user.firstName}<br />
            <strong>Email:</strong> {props.user.email}<br />
            <hr />
        </>
    );
}
export default User;