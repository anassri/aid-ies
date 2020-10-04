import { useEffect, useState } from 'react';
import { formatDistance, differenceInSeconds, parseISO } from 'date-fns'
import { setHighest } from '../store/campaign';
import { useDispatch } from 'react-redux';

export const DetermineTimeRemaining = ({ isExpired, closingDate, createdAt }) => {
    const start = parseISO(createdAt);
    const end = parseISO(closingDate);
    const currentDate = new Date();
    const remaining = differenceInSeconds(end, currentDate);
    const [remainingSeconds, setRemainingSeconds] = useState(remaining);

    const duration = seconds => formatDistance(0, seconds * 1000, { includeSeconds: true })

    useEffect(() => {
        const counter = setInterval(() => {
            setRemainingSeconds(previousSeconds => previousSeconds - 1)
        }, 1000);
        return () => clearInterval(counter);
    }, [])
    if(isExpired) return "Closed";
    return `${duration(remainingSeconds)} Remaining`;
}

export const DetermineBid = ({campaign}) => {
    const dispatch = useDispatch();
    let highest = null
    let id = null
    if (campaign.Bids.length) {
        campaign.Bids.forEach(el => {
            if (highest < Number.parseInt(el.bid)) {
                highest = Number.parseInt(el.bid)
                id = el.userId;
            }
        });        
    }
    useEffect(()=>{
        dispatch(setHighest(highest,id));

    }, [highest])
    if (highest && !campaign.isExpired) {
        return `Current Bid $${highest}`;
    } else if (highest && campaign.isExpired){
        return `Final Bid $${highest}`;
    } else if (!highest && campaign.isExpired){
        return `No Bids`;
    }
    return `Starting Price $${campaign.startingPrice}`;
}