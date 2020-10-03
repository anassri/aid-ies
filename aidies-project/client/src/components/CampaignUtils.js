import { useEffect, useState } from 'react';
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
        const counter = setInterval(() => {
            setRemainingSeconds(previousSeconds => previousSeconds - 1)
        }, 1000);
        return () => clearInterval(counter);
    }, [])

    return `${duration(remainingSeconds)} Remaining`;
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
    useEffect(()=>{
        dispatch(setHighest(highest));

    }, [highest])
    if (highest) {
        return `Current Bid $${highest}`;
    }
    return `Starting Price $${campaign.startingPrice}`;
}