export const GET_USER_CAMPAIGNS = 'aidies/dashboard/GET_USER_CAMPAIGNS';
export const GET_FAVORITES = 'aidies/dashboard/GET_FAVORITES';
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
export const getUserCampaigns = (id) => {
    return async dispatch => {
        const response = await fetch(`/api/dashboard/${id}`);

        if (response.ok) {
            const data = await response.json();
            dispatch(getCampaigns(data));
        }
    };
};
export const getUserfavorites = (id) => {
    return async dispatch => {
        const response = await fetch(`/api/dashboard/${id}/favorites`);

        if (response.ok) {
            const data = await response.json();
            dispatch(getfavorites(data));
        }
    };
};



export default function reducer(state = { userCampaigns: [], favorites: [] }, action) {
    switch (action.type) {
        case GET_USER_CAMPAIGNS:
            return { ...state, userCampaigns: action.campaigns };
        case GET_FAVORITES:
            return { ...state, favorites: action.campaigns };
        default:
            return state;
    }
}