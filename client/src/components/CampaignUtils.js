import React, { useEffect, useState } from 'react';
import { formatDistance, differenceInSeconds, parseISO } from 'date-fns'
import { setHighest } from '../store/campaign';
import { useDispatch } from 'react-redux';

export const DetermineTimeRemaining = ({ closingDate, createdAt }) => {
    const start = parseISO(createdAt);
    const end = parseISO(closingDate);
    const currentDate = new Date();
    const remaining = differenceInSeconds(end, currentDate);
    const [remainingSeconds, setRemainingSeconds] = useState(remaining);

    const duration = seconds => formatDistance(0, seconds * 1000, { includeSeconds: true })

    useEffect(() => {
        setInterval(() => {
            setRemainingSeconds(previousSeconds => previousSeconds - 1)
        }, 1000);
    }, [])

    return duration(remainingSeconds);
}

export const DetermineBid = ({campaign}) => {
    const dispatch = useDispatch();
    let highest = null
    if (campaign.Bids.length) {
        campaign.Bids.forEach(el => {
            if (highest < Number.parseInt(el.bid)) {
                highest = Number.parseInt(el.bid)
            }
        });        
    }
    dispatch(setHighest(highest));
    if (highest) {
        return <div className="current-bid-number">Current Bid ${highest}</div>
    }
    return <div className="current-bid-number">Starting Price ${campaign.startingPrice}</div>
}