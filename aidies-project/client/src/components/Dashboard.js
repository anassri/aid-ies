import React, {useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CampaignItems from './CampaignItems';
import { getUserCampaigns, getUserFavorites, getCampaigns} from '../store/dashboard';
import { clearExistingErrors } from '../store/authentication';
import Grid from '@material-ui/core/Grid';
import DashboardBids from './DashboardBids';
import UserEdit from './UserEdit';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        // height: '100%',
        minHeight: 500,
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        marginTop: 20,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    content: {
        maxWidth: 1080,
    }
   
}));

export default function Dashboard() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const userId = useSelector(state => state.authentication.user.id);
    const allCampaigns = useSelector(state => state.campaign.list);
    const campaigns = useSelector(state => state.dashboard.userCampaigns);
    const favorites = useSelector(state => state.dashboard.favorites);
    const highest = useSelector(state => state.campaign.highestBid);
    const winningUser = useSelector(state => state.campaign.winningUser);

    const dispatch = useDispatch();


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleMyCampaigns = () =>{
        dispatch(getUserCampaigns(userId))
    }
    const handleFavorites = () =>{
        dispatch(getUserFavorites(userId))
    }
    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Won Campaigns" {...a11yProps(0)} />
                <Tab label="My Campaigns" {...a11yProps(1)} onClick={handleMyCampaigns}/>
                <Tab label="My Favorites" {...a11yProps(2)} onClick={handleFavorites}/>
                <Tab label="My Bids" {...a11yProps(3)} />
                <Tab label="My Profile" {...a11yProps(4)} />\
            </Tabs>
            <div className={classes.content}>
                <TabPanel value={value} index={0}>
                    <Typography variant="h3" color="textSecondary" component="p" style={{opacity: 0.3, justifyContent:'center', }}>
                        No won campaigns yet.
                        <Grid container
                            direction="row"
                            justify="flex-start"
                            spacing={3}>

                            {/* {allCampaigns.map((campaign) => { <Grid key={campaign.id} item xs={4}><CampaignItems campaign={campaign} /></Grid>})} */}
                        </Grid>
                    </Typography>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Grid container
                        direction="row"
                        justify="flex-start"
                        spacing={3}>

                        {campaigns.map((campaign) => <Grid key={campaign.id} item xs={4}><CampaignItems campaign={campaign} /></Grid>)}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Grid container
                        direction="row"
                        justify="flex-start"
                        spacing={3}>

                        {/* {favorites.map((favorite) => <Grid key={favorite.id} item xs={4}><CampaignItems campaign={favorite} /></Grid>)} */}
                    </Grid>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <DashboardBids userId={userId}/>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <UserEdit />
                </TabPanel>
            </div>
        </div>
    );
}
