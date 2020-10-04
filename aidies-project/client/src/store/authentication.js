import Cookies from "js-cookie";

export const SET_USER = 'aidies/authentication/SET_TOKEN';
export const REMOVE_USER = 'aidies/authentication/REMOVE_TOKEN';
export const ERRORS = 'aidies/authentication/ERRORS';
export const CLEAR_ERRORS = 'aidies/authentication/CLEAR_ERRORS';

export const setErrors = (errors) => {
    return {
        type: ERRORS,
        errors
    }
}
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    }
}

export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}
export const setErrors = (errors) => {
    return {
        type: ERRORS,
        errors
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('/api/session', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data));
        } else {
            const errors = await response.json();
            dispatch(setErrors(errors));
        }
    };
};

export const logout = () => async dispatch => {
    console.log('logout thunk')
    const res = await fetch('/api/session', {
        method: "delete"
    });
    if (res.ok) {
        dispatch(removeUser());
    }
}

export const signup = ({ firstName, lastName, email, password, confirmPassword, location, bio, website, instagram, facebook }) => {
    return async dispatch => {
        const response = await fetch('/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password, confirmPassword, location, bio, website, instagram, facebook }),
        });
        
        if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data));
        } else {
            const errors = await response.json();
            dispatch(setErrors(errors));
        }
    };
};
export const editUser = ({ firstName, lastName, email, password, confirmPassword, location, bio, website, instagram, facebook, id }) => {
    return async dispatch => {
        const response = await fetch(`/api/user/${id}/edit`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password, confirmPassword, location, bio, website, instagram, facebook }),
        });
        
        if (response.ok) {
            const data = await response.json();
            dispatch(setUser(data));
        } else {
            const errors = await response.json();
            dispatch(setErrors(errors));
        }
    };
};

function loadUser() {
    const authToken = Cookies.get("aidies/authentication/token");
    
    if (authToken) {
        try {
            const payload = authToken.split(".")[1];
            const decodedPayload = atob(payload);
            const payloadObj = JSON.parse(decodedPayload);
            const { data } = payloadObj;
            return { user: data, errors: [] };
        } catch (e) {
            Cookies.remove("token");
        }
    }
    return { user: { id: null }, errors: []  };
}
export const clearExistingErrors = () => dispatch => dispatch(clearErrors());

export default function reducer(state = loadUser(), action) {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.user};
        case REMOVE_USER:
            return { user: { id: null }, errors: []  };
        case ERRORS:
            return { ...state, errors: action.errors };
        case CLEAR_ERRORS:
            return { ...state, errors: [] };
        default:
            return state;
    }
}