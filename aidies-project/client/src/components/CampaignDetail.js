import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';

import { getOneCampaign, bid, setLocation, deleteCampaign } from '../store/campaign';
import { DetermineBid, DetermineTimeRemaining } from './CampaignUtils';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Button, Menu, MenuItem} from '@material-ui/core';
import '../css/campaign.css';


const useStyles = makeStyles({
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
    button: {
        backgroundColor: '#222',
        color: '#fff',
    },
    '&$focus': {
        backgroundColor: 'green',
    },
    color: {
        color: '#222',
        
    },
    delete:{
        color: '#FF0000'
    }
});
const CampaignDetail = () => {
    const classes = useStyles();
    const {id} = useParams();
    const history = useHistory();
    const location = useLocation();
    const needLogin = useSelector(state => !state.authentication.user.id);

    const campaign = useSelector(state => state.campaign.current);
    const highest = useSelector(state => state.campaign.highestBid);
    const userId = useSelector(state => state.authentication.user.id);
    const [anchorEl, setAnchorEl] = useState(null);
    
    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(getOneCampaign(id))
    }, [id]); 
     
    if(!campaign || !campaign.User){
        return null;
    }
    // const bidsDesc = campaign.Bids.slice(0).reverse();
    
    const handleBid = () => {
        if (needLogin){
            dispatch(setLocation(location.pathname));
            return history.push("/login"); 
        }
        let increaseBid = parseInt(campaign.startingPrice) + 5;
        if (highest) {
            increaseBid = highest + 5;
        }
        dispatch(bid(id, increaseBid, userId));
    }


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        
        setAnchorEl(null);
    };
    const handleDelete = () => {
        dispatch(deleteCampaign(id))
        history.push('/');
        setAnchorEl(null);
    };
    const handleEdit = () => {
        history.push(`/campaign/${id}/edit`);
    };
    
    return (
        <Card className={`${classes.root} detail-card`}>
            
            <div className={`${classes.details} campaign-main-container`}>
                <div className="image-container">
                    <img
                        className="campaign-image"
                        src={campaign.image}
                        alt={campaign.name}
                    />
                </div>
                <div className="information-container">
                    {userId === campaign.userId 
                        ? <div className= "edit-menu"> 
                           
                     
                            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                <i className="fas fa-ellipsis-h fa-lg edit-icon" ></i>
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                                <MenuItem onClick={handleDelete} className={classes.delete}>Delete</MenuItem>
                            </Menu>
                        </div>
                     : 
                     null }
                    
                    <Typography variant="h3" component="h2">
                        {campaign.name}
                    </Typography>
                    <Typography variant="subtitle2" component="h2">
                        By {campaign.User.firstName} {campaign.User.lastName} for {campaign.Charity.name}
                    </Typography>
                    <div className="detail-bid time-left">
                        <div className="detail-current-bid">
                            <Typography variant="h4" component="h2">
                                <DetermineBid campaign={campaign} />    
                            </Typography>
                            <Button onClick={handleBid} size="large" variant="contained" className={classes.button}>
                                Bid $5
                            </Button>
                        </div>
                        <Typography variant="h6" component="h2" color="secondary"className="detail-remaining">
                            <DetermineTimeRemaining closingDate={campaign.closingDate} createdAt={campaign.createdAt} />
                        </Typography>
                    </div>
                    <div className="other-info">
                        <div className="category">{campaign.Category.name}</div>
                        <div className="location">
                            <div className="nav-icon"><i className="fas fa-map-marker-alt"></i></div>
                            <div>{campaign.User.location}</div>
                        </div>
                    </div>
                    <div className="information-tabs">
                        <Typography variant="h6" component="h2">
                            About The Campaign
                        </Typography>
                        <Typography variant="body2" component="h2">
                            {campaign.story}
                        </Typography>
                        <Typography variant="h6" component="h2" className="charity-info">
                            About The Charity
                        </Typography>
                        <Typography variant="body2" component="h2">
                            {campaign.Charity.bio}
                        </Typography>
                        <Link to={campaign.Charity.website} className="charity-website">
                            <Typography variant="subtitle2" component="h2" >
                                {campaign.Charity.website}
                            </Typography>
                        </Link>
                    </div>
                    
                </div>

            </div>
          </Card>
    )
}


export default CampaignDetail;