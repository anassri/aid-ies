
export const LOAD = 'aidies/campaign/LOAD';
export const LOAD_CHARITY = 'aidies/campaign/LOAD_CHARITY';
export const LOAD_CATEGORY = 'aidies/campaign/LOAD_CATEGORY';
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
export const loadCharity = (charity) => {
    return {
        type: LOAD_CHARITY,
        charity
    }
}
export const loadCategory = (category) => {
    return {
        type: LOAD_CATEGORY,
        category
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
export const deleteCampaign = (id) => {
    return async dispatch => {
        await fetch(`/api/campaign/${id}/delete`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
        });
    };
};
export const searchCampaigns = (keyword) => {
    return async dispatch => {
        const response = await fetch(`/api/search/${keyword}`);

        if (response.ok) {
            const data = await response.json();
            
            dispatch(load(data));
        }
    };
};
export const filterCampaigns = (keyword) => {
    return async dispatch => {
        const response = await fetch(`/api/filter/${keyword}`);

        if (response.ok) {
            const data = await response.json();
            dispatch(load(data));
        }
    };
};
export const createCampaign = ({ campaignName, summary, story, startingPrice, closingDate, userId, charity, category }) => {
    return async dispatch => {
        await fetch('/api/create', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ campaignName, summary, story, startingPrice, closingDate, userId, charity, category }),
        });
    };
};
export const getCharities = () => {
    return async dispatch => {
        const response = await fetch('/api/charity');

        if (response.ok) {
            const data = await response.json();
            
            dispatch(loadCharity(data));
        }
    };
};
export const getCategories = () => {
    return async dispatch => {
        const response = await fetch('/api/category');

        if (response.ok) {
            const data = await response.json();
            
            dispatch(loadCategory(data));
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
export const editCampaign = ({ campaignName, summary, story, startingPrice, closingDate, userId, charity, category, id }) => {
    return async dispatch => {
        await fetch(`/api/campaign/${id}/edit`, {
            method: "put",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({ campaignName, summary, story, startingPrice, closingDate, userId, charity, category }),
        });

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

export default function reducer(state = { list: [], current:{ closingDate: ''}, charities: [], categories: [] }, action) {
    switch (action.type) {
        case LOAD:
            return { ...state, list: action.campaign };
        case SET_CURRENT:
            return { ...state, current: action.campaign };
        case SET_HIGHEST_BID:
            return { ...state, highestBid: action.highestBid };
        case SET_PREVIOUS_LOCATION:
            return { ...state, previousLocation: action.location };
        case LOAD_CHARITY:
            return { ...state, charities: action.charity };
        case LOAD_CATEGORY:
            return { ...state, categories: action.category };
        default:
            return state;
    }
}