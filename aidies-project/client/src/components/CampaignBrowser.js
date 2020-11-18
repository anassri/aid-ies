import React, {  useEffect } from 'react';
import '../css/campaign.css'
import { useSelector, useDispatch } from 'react-redux';
import {getCampaigns} from '../store/campaign';
import CampaignItems from './CampaignItems';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
    
    root: {
        flexGrow: 1,
        flexDirection: 'column',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const CampaignBrowser = () => {
    const classes = useStyles();
    const campaigns = useSelector(state => state.campaign.list );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCampaigns())
    }, []);
    
    // if(!campaigns.length){
    //     return null; 
    // }
    return (
    
        <div className={`${classes.root} campaign-browser`} >
            <Typography gutterBottom variant="h4" component="h2" className="campaign-header-label campaign-text">
                Active Campaigns
            </Typography>
            <Grid container 
                direction="row"
                justify="center"
                spacing={3}>
                {campaigns.length
                ? campaigns.map((campaign) => { if(!campaign.isExpired) return <Grid key={campaign.id} item xs={4}><CampaignItems  campaign={campaign} /></Grid> })
                : <h1 className="no-campaigns-container">No Active Campaigns Found.</h1>
                }
            </Grid>
            <Divider style={{marginTop:40}}/>
            <Typography gutterBottom variant="h4" component="h2" className="campaign-header-label campaign-text">
                Closed Campaigns
            </Typography>
            <Grid container
                direction="row"
                justify="center"
                spacing={3}>
                {campaigns.length
                    ?campaigns.map((campaign) => { if (campaign.isExpired) return <Grid key={campaign.id} item xs={4}><CampaignItems campaign={campaign} /></Grid> })
                : <h1 className="no-campaigns-container">No Completed Campaigns Found.</h1>
                }
            </Grid>
        </div>
    
    );
}

export default CampaignBrowser;