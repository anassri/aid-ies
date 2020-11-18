import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DetermineBid, DetermineTimeRemaining } from './CampaignUtils';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import {  differenceInSeconds, parseISO } from 'date-fns'
import '../css/campaign.css';


const useStyles = makeStyles({
    root: {
        height: '100%'
    },
    media: {
        height: 250,
    },
    progress: {
        width: '20%',
    },
    bottom: {
        alignItems: 'flex-end'
    }
});

const CampaignItems = ({ campaign }) => {
    const classes = useStyles();
    const [progress, setProgess] = useState(0);

    const start = parseISO(campaign.createdAt);
    const end = parseISO(campaign.closingDate);
    const currentDate = new Date();
    const total = differenceInSeconds(end, start);
    const elapsed = differenceInSeconds(end, currentDate);
    const elapsedPercent = (parseInt(elapsed) * 100) / parseInt(total);
    useEffect(()=>{
        setProgess(elapsedPercent);
    }, [])
    

    return (
        <Card className={`${classes.root} card-container`}>
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
                    <Typography variant="caption" color="textSecondary" component="p" style={{marginTop: 10}}>
                        By <span style={{ fontWeight: "bold" }}>{campaign.User.firstName} {campaign.User.lastName}</span> for <span style={{ fontWeight: "bold" }}>{campaign.Charity.name}</span>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className="stats-container">
                <div className="bid time-left">
                    <div className="current-bid">
                        <Typography gutterBottom variant="body1" component="h2">
                            <DetermineBid campaign={campaign} />
                        </Typography>
                    </div>
                    <div className="remaining counter progress-bar">
                        <Typography gutterBottom variant="body1" component="h2">
                            <DetermineTimeRemaining isExpired={campaign.isExpired} closingDate={campaign.closingDate} createdAt={campaign.createdAt} />
                        </Typography>
                        <div className={classes.progress}>
                            <LinearProgress variant="determinate" value={progress} />
                        </div>
                    </div>
                </div>
            </CardActions>
            <CardActions className="items-other-info-container">
                <div className={`${classes.bottom} items-other-info`}>
                    <Typography variant="body1" color="textSecondary" component="p">
                        {campaign.Category.name}
                    </Typography>
                    <div className="location">
                        <div className="nav-icon"><i className="fas fa-map-marker-alt"></i></div>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {campaign.User.location}
                        </Typography>
                    </div>
                </div>
            </CardActions>
        </Card>
    );
}

export default CampaignItems;