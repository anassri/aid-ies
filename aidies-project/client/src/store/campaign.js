
export const LOAD = 'aidies/campaign/LOAD';
export const SET_CURRENT = 'aidies/campaign/SET_CURRENT';
export const SET_HIGHEST_BID = 'aidies/campaign/SET_HIGHEST_BID';
export const SET_PREVIOUS_LOCATION = 'aidies/campaign/SET_PREVIOUS_LOCATION';
export const load = (campaign) => {
    return {
        type: LOAD,
        campaign
    }
}

export const loadOne = (campaign) => {
    return {
        type: SET_CURRENT,
        campaign
    }
}
export const setHighestBid = (highestBid) => {
    return {
        type: SET_HIGHEST_BID,
        highestBid
    }
}
export const setPreviousLocation = (location) => {
    return {
        type: SET_PREVIOUS_LOCATION,
        location
    }
}
export const getCampaigns = () => {
    return async dispatch => {
        const response = await fetch('/api/campaign');

        if (response.ok) {
            const data = await response.json();
            
            dispatch(load(data));
        }
    };
};

export const getOneCampaign = (id) => {
    return async dispatch => {
        const response = await fetch(`/api/campaign/${id}`);

        if (response.ok) {
            const data = await response.json();
            dispatch(loadOne(data));
        }
    };
};
export const bid = (id, value, userId) => {
    return async dispatch => {
        const response = await fetch(`/api/campaign/${id}/bid`, {
            method: "post",
            headers: {
                "Content-Type":"Application/json"
            },
            body: JSON.stringify({value, userId})
        });

        if (response.ok) {
            const data = await response.json();

            dispatch(loadOne(data));
        }
    };
};

export const setHighest = (value) => dispatch => dispatch(setHighestBid(value));
export const setLocation = (location) => dispatch => dispatch(setPreviousLocation(location));

export default function reducer(state = { list: [] }, action) {
    switch (action.type) {
        case LOAD:
            return { ...state, list: action.campaign };
        case SET_CURRENT:
            return { ...state, current: action.campaign };
        case SET_HIGHEST_BID:
            return { ...state, highestBid: action.highestBid };
        case SET_PREVIOUS_LOCATION:
            return { ...state, previousLocation: action.location };
        default:
            return state;
    }
}