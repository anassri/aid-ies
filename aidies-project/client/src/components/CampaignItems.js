import React from 'react';
import { Link } from 'react-router-dom';

import { DetermineBid, DetermineTimeRemaining } from './CampaignUtils';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        height: 470,
    },
    media: {
        height: 250,
    },
});



const CampaignItems = ({ campaign }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <Link key={campaign.id} to={`/campaign/${campaign.id}`}>
                    <CardMedia
                        className={classes.media}
                        image={campaign.image}
                        title={campaign.name}
                    />
                </Link>
                <CardContent>
                
                    <Typography gutterBottom variant="h5" component="h2">
                        {campaign.name}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {campaign.summary}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" component="p">
                        By {campaign.User.firstName} {campaign.User.lastName} for {campaign.Charity.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                
            </CardActions>
        </Card>
    );
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
                    <div className="current-bid">
                        <DetermineBid campaign={campaign} />
                    </div>
                    <div className="remaining">
                        <DetermineTimeRemaining closingDate={campaign.closingDate} createdAt={campaign.createdAt} />
                    </div>
                </div>
                <div className="bread-crumps">
                    <div className="category">{campaign.Category.name}</div>
                    <div className="location">{campaign.User.location}</div>
                </div>
            </div>
            
        </div>
    );
}

export default CampaignItems;