import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { getUserBids} from '../store/dashboard';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export default function DashboardBids({ userId}) {
    const bids = useSelector(state => state.dashboard.bids);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getUserBids(userId))
    }, [])
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav" >
            {bids.map(bid => 
                    <ListItemLink key={bid.id} button href={`/campaign/${bid.campaignId}`}>
                    <ListItemText className="bid-entry">{`You bid`} <span style={{ fontWeight: "bold", color: '#f50057' }}>{`$${bid.bid}`}</span> {`on`} <span style={{ fontWeight: "bold" }}>{bid.Campaign.name}</span> {`for`} <span style={{ fontWeight: "bold" }}>{bid.Campaign.Charity.name}</span></ListItemText>
                    </ListItemLink>
            )}
            </List>
        </div>
    );
}
