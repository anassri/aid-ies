import React, { useEffect, useState } from 'react';

import { apiUrl } from '../config';
import User from './User';

function UsersList (props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(apiUrl + '/session/');
            const responseData = await response.json();
            console.log(responseData);
            setUsers(responseData.user);
        }
        fetchData();
    }, []);

    const userComponents = users.map((user) => <User key={user.id} user={user} />)
    return (
        <>
            <h1>User List: </h1>
            {userComponents}
        </>
        );
}

export default UsersList;