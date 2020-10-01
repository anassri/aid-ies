import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';

import { getOneCampaign, bid, setLocation } from '../store/campaign';
import { DetermineBid, DetermineTimeRemaining } from './CampaignUtils';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
    root: {
        maxWidth: 1080,
        display: 'flex',
        flexDirection: 'row',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const CampaignDetail = ({ needLogin}) => {
    const classes = useStyles();
    const {id} = useParams();
    const history = useHistory();
    const location = useLocation();
    const campaign = useSelector(state => state.campaign.current);
    let highest = useSelector(state => state.campaign.highestBid);
    const userId = useSelector(state => state.authentication.user.id);
    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(getOneCampaign(id))
    }, [id]); 
     
    if(!campaign || !campaign.User){
        return null;
    }
    const handleBid = () => {
        console.log(needLogin);
        if (needLogin){
            dispatch(setLocation(location.pathname));
            return history.push("/login"); 
        }
        if (!highest) {
            let increaseBid = parseInt(campaign.startingPrice) + 5;
            dispatch(bid(id, increaseBid, userId));
            
        } else {
            let increaseBid = highest + 5;
            dispatch(bid(id, increaseBid, userId));
        }
    }
    return (
        <Card className={classes.root}>
            <div className={classes.details}>
                <div className="image-container">
                    <img
                        className="campaign-image"
                        src={campaign.image}
                        alt={campaign.name}
                        width="500"
                    />
                </div>
                <div className="information-container">
                    <div className="detail-primary-text">{campaign.name}</div>
                    <div className="detail-campaign-owner">by {campaign.User.firstName} {campaign.User.lastName} for {campaign.Charity.name}</div>
                    <div className="detail-bid time-left">
                        <div className="detail-current-bid">
                            <DetermineBid campaign={campaign} />
                            <div className="bid-info"> click to bid with $5</div>
                            <button onClick={handleBid}>Bid</button>
                        </div>
                        <div className="detail-remaining">
                            <DetermineTimeRemaining closingDate={campaign.closingDate} createdAt={campaign.createdAt} />
                        </div>
                    </div>
                    <div className="detail-secondary-text">{campaign.story}</div>
                    <div className="other-info">
                        <div className="category">{campaign.Category.name}</div>
                        <div className="location">{campaign.User.location}</div>
                    </div>
                </div>

            </div>
          </Card>
    )
}


export default CampaignDetail;