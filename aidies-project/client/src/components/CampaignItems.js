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

import { formatDistance, differenceInSeconds, parseISO } from 'date-fns'
import '../css/campaign.css';


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 250,
    },
    progress: {
        width: '20%',
    }
});

const CampaignItems = ({ campaign }) => {
    const classes = useStyles();
    const [progress, setProgess] = useState(0);

    const start = parseISO(campaign.createdAt);
    const end = parseISO(campaign.closingDate);
    const currentDate = new Date();
    console.log(end)
    const total = differenceInSeconds(end, start);
    const elapsed = differenceInSeconds(end, currentDate);
    console.log(total);
    console.log(elapsed);
    const elapsedPercent = (parseInt(elapsed) * 100) / parseInt(total);
    console.log(elapsedPercent);
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
                    <Typography variant="caption" color="textSecondary" component="p">
                        By {campaign.User.firstName} {campaign.User.lastName} for {campaign.Charity.name}
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
                            <DetermineTimeRemaining closingDate={campaign.closingDate} createdAt={campaign.createdAt} />
                        </Typography>
                        <div className={classes.progress}>
                            <LinearProgress variant="determinate" value={progress} />
                        </div>
                    </div>
                </div>
            </CardActions>
            <CardActions className="items-other-info-container">
                <div className="items-other-info">
                    <Typography variant="body1" color="textSecondary" component="p">
                    <div className="category">{campaign.Category.name}</div>
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