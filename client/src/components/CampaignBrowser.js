import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../css/campaign.css'
import { useSelector, useDispatch } from 'react-redux';
import {getCampaigns} from '../store/campaign';
import CampaignItems from './CampaignItems';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    
    root: {
        flexGrow: 1,
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
    
    if(!campaigns.length){
        return null;
    }
    return (
        <div className={classes.root} className="campaign-browser">
            <Grid container 
                direction="row"
                justify="center"
                spacing={3}>
                {campaigns.map((campaign) => <Grid key={campaign.id} item xs={4}><CampaignItems  campaign={campaign} /></Grid>)}
            </Grid>
        </div>
    );
}

export default CampaignBrowser;