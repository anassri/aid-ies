export const GET_USER_CAMPAIGNS = 'aidies/dashboard/GET_USER_CAMPAIGNS';
export const GET_FAVORITES = 'aidies/dashboard/GET_FAVORITES';
export const GET_BIDS = 'aidies/dashboard/GET_BIDS';
export const getCampaigns = (campaigns) => {
    return {
        type: GET_USER_CAMPAIGNS,
        campaigns
    }
}
export const getfavorites = (campaigns) => {
    return {
        type: GET_FAVORITES,
        campaigns
    }
}
export const getBids = (bids) => {
    return {
        type: GET_BIDS,
        bids
    }
}
export const getUserCampaigns = (id) => {
    return async dispatch => {
        const response = await fetch(`/api/dashboard/${id}`);

        if (response.ok) {
            const data = await response.json();
            dispatch(getCampaigns(data));
        }
    };
};
export const getUserFavorites = (id) => {
    return async dispatch => {
        const response = await fetch(`/api/dashboard/${id}/favorites`);

        if (response.ok) {
            const data = await response.json();
            dispatch(getfavorites(data));
        }
    };
};
export const getUserBids = (id) => {
    return async dispatch => {
        const response = await fetch(`/api/dashboard/${id}/bids`);

        if (response.ok) {
            const data = await response.json();
            dispatch(getBids(data));
        }
    };
};



export default function reducer(state = { userCampaigns: [], favorites: [], bids: [] }, action) {
    switch (action.type) {
        case GET_USER_CAMPAIGNS:
            return { ...state, userCampaigns: action.campaigns };
        case GET_FAVORITES:
            return { ...state, favorites: action.campaigns };
        case GET_BIDS:
            return { ...state, bids: action.bids };
        default:
            return state;
    }
}