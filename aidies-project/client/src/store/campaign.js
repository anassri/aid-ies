
export const LOAD = 'aidies/campaign/LOAD';

export const load = (campaign) => {
    return {
        type: LOAD,
        campaign
    }
}

export const getCampaigns = () => {
    console.log("I'm getting them")
    return async dispatch => {
        const response = await fetch('api/campaign');

        if (response.ok) {
            const data = await response.json();
            
            dispatch(load(data));
        }
    };
};


export default function reducer(state = { list: [] }, action) {
    switch (action.type) {
        case LOAD:
            return { ...state, list: action.campaign };
        default:
            return state;
    }
}