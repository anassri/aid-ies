import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

import {getCampaigns} from '../store/campaign';
import { useSelector, useDispatch } from 'react-redux';

const CampaignBrowser = () => {
    const campaigns = useSelector(state => state.campaign.list );
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCampaigns())
    }, [dispatch]);
    
    return (
        <main>
            {campaigns.map((campaign) => {
                return (
                    <div className="nav-entry">
                        <Link key={campaign.id} to={`/campaign/${campaign.id}`}>
                            <img
                                className="nav-campaign-image"
                                src={campaign.image}
                                alt={campaign.name}
                                width="300"
                            />
                        </Link>
                            <div>
                                <div className="primary-text">{campaign.name}</div>
                                <div className="secondary-text">{campaign.summary}</div>
                                <div className="campaign-owner">by {campaign.User.firstName} {campaign.User.lastName} for {campaign.Charity.name}</div>
                                <div className="bid time-left">
                                    <div className="current-bid"></div>
                                    <div className="remaingin"></div>
                                </div>
                                <div className="bread-crumps">
                                    <div className="category">{campaign.Category.name}</div>
                                    <div className="location">{campaign.User.location}</div>
                                    
                                </div>
                            </div> 
                        </div>
                );
            })}
        </main>
    );
}

export default CampaignBrowser;