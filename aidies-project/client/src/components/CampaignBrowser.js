import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {getCampaigns} from '../store/campaign';
import CampaignItems from './CampaignItems';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    
    root: {
        flexGrow: 1,
        maxWidth: 1080,
        display: 'flex',
        justifyContent: 'center',
        
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
        <div className={classes.root}>
            <Grid container 
                direction="row"
                justify="center"
                spacing={3}>
                {campaigns.map((campaign) => <Grid item xs={4}><CampaignItems key={campaign.id} campaign={campaign} /></Grid>)}
            </Grid>
        </div>
    );
}

export default CampaignBrowser;