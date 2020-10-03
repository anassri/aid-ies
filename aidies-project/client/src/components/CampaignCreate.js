import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';

import { getOneCampaign, bid, setLocation } from '../store/campaign';
import { DetermineBid, DetermineTimeRemaining } from './CampaignUtils';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Button} from '@material-ui/core';
import '../css/campaign.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));
const CampaignCreate = ({ needLogin }) => {
    const classes = useStyles();
    const { id } = useParams();
    const history = useHistory();
    const location = useLocation();
    const campaign = useSelector(state => state.campaign.current);
    let highest = useSelector(state => state.campaign.highestBid);
    const userId = useSelector(state => state.authentication.user.id);
    const [anchorEl, setAnchorEl] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getOneCampaign(id))
    }, [id]);

    if (!campaign || !campaign.User) {
        return null;
    }

    const handleBid = () => {
        if (needLogin) {
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
        <Card className={classes.root} className="detail-card">

            <div className={classes.details} className="campaign-main-container">
                <div className="image-container">
                    <img
                        className="campaign-image"
                        src={campaign.image}
                        alt={campaign.name}
                    />
                </div>
                <div className="information-container">

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
                        <Typography variant="h6" component="h2" color="secondary" className="detail-remaining">
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

                        {campaign.story}
                    </div>

                </div>

            </div>
        </Card>
    )
}


export default CampaignCreate;