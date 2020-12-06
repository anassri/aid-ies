import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { editCampaign, getCharities, getCategories } from '../store/campaign';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Button, FormControl, Grid, InputLabel, Select, MenuItem, TextField, IconButton } from '@material-ui/core';
import '../css/campaign.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            // margin: theme.spacing(1),
        },
        flexDirection: 'row'
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        display: 'none',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    button: {
        backgroundColor: '#222',
        color: '#fff',
        textAlign: 'right',
    },
    formControl: {
        minWidth: 502,
    },
    inputLabel: {
        paddingTop: -5,
        paddingLeft: 14,
    }
}));
const CampaignCreate = () => {
    const [campaignName, setCampaignName] = useState('New awesome campaign');
    const [summary, setSummary] = useState('new awesome summary');
    const [story, setStory] = useState('great story');
    const [image, setImage] = useState('');
    const [startingPrice, setStartingPrice] = useState('50');
    const [closingDate, setClosingDate] = useState('2020-10-26T18:36');
    const [charity, setCharity] = useState(2);
    const [category, setCategory] = useState(3);
    const [button, setButton] = useState('Start a campaign');
    const [campaignPictureFile, setCampaignPictureFile] = useState(null);
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const campaign = useSelector(state => state.campaign.current);
    const userId = useSelector(state => state.authentication.user.id);
    const charities = useSelector(state => state.campaign.charities);
    const categories = useSelector(state => state.campaign.categories);
    
    useEffect(() => {
        dispatch(getCategories());
        dispatch(getCharities());
        setCampaignName(campaign.name);
        setSummary(campaign.summary);
        setStory(campaign.story);
        setImage(campaign.image);
        setStartingPrice(campaign.startingPrice);
        const editedDate = campaign.closingDate.slice(0,campaign.closingDate.length-2);
        setClosingDate(editedDate);
        setCharity(campaign.charityId);
        setCategory(campaign.categoryId);
        setButton('Submit Changes');
    }, [campaign]);

    if(!campaign.id){
        history.push('/');
    }
    const handleCreate = async (e) => {
        e.preventDefault();
        await dispatch(editCampaign({ campaignName, summary, story, startingPrice, closingDate, userId, charity, category, id: campaign.id }));
        // savePhoto();
        history.push(`/campaign/${campaign.id}`);
    }
    // const savePhoto = () => {
    //     const data = new FormData();
    //     data.append('campaignPictureFile', campaignPictureFile);
    //     dispatch(uploadPhoto(data));
    // }
    return (
        <Card className={`${classes.root} create-card`}>
            <div className={`${classes.details} campaign-main-container`}>

                <div className="image-container">
                    <img
                        className="campaign-image"
                        src={campaignPictureFile ? URL.createObjectURL(campaignPictureFile) :image}
                        alt={campaignName}
                    />
                </div>

                <div className="information-container details-container" style={{padding:30, width: 580}}>
                    <Typography component="h1" variant="h5" className="campaign-title">
                        Edit A Campaign
                    </Typography>

                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="campaignName"
                                name="campaignName"
                                variant="outlined"
                                required
                                fullWidth
                                id="campaignName"
                                label="Campaign Name"
                                autoFocus
                                value={campaignName}
                                onChange={(e) => setCampaignName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="summary"
                                name="summary"
                                variant="outlined"
                                required
                                fullWidth
                                id="summary"
                                label="Short Summary"
                                autoFocus
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div className="upload-photo-container" style={{ display: 'flex' }}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={(e) => setCampaignPictureFile(e.target.files[0])}
                                />
                                <label htmlFor="contained-button-file">
                                </label>
                                <Button variant="contained" disabled className={classes.button} component="span">
                                    Upload
                            </Button>
                                <p style={{ marginLeft: 20, fontStyle: "italic", opacity: 0.3 }}>Upload feature is coming soon...</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                variant="outlined"
                                label="Story"
                                name="story"
                                fullWidth
                                required
                                multiline
                                rows={4}
                                autoComplete="story"
                                id="outlined-multiline"
                                value={story}
                                onChange={(e) => setStory(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="startingPrice"
                                name="startingPrice"
                                variant="outlined"
                                required
                                fullWidth
                                id="startingPrice"
                                label="Starting Price"
                                autoFocus
                                value={startingPrice}
                                onChange={(e) => setStartingPrice(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="datetime-local"
                                label="Closing Date"
                                type="datetime-local"
                                required
                                fullWidth
                                variant="outlined"
                                value={closingDate}
                                onChange={(e) => setClosingDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl className={classes.formControl}>

                                <InputLabel className={classes.inputLabel} id="simple-select-outlined-label">Select a Charity</InputLabel>
                                <Select
                                    labelId="simple-select-outlined-label"
                                    id="simple-select-outlined"
                                    variant="outlined"
                                    value={charity}
                                    onChange={(e) => setCharity(e.target.value)}
                                    label="Select a Charity"
                                >
                                    {charities.map(charity => <MenuItem key={charity.id} value={charity.id}>{charity.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormControl className={classes.formControl}>

                                <InputLabel className={classes.inputLabel} id="simple-select-outlined-label">Select a Category</InputLabel>
                                <Select
                                    labelId="simple-select-outlined-label"
                                    id="simple-select-outlined"
                                    variant="outlined"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    label="Select a Category"
                                >
                                    {categories.map(category => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Button onClick={handleCreate} size="large" variant="contained" className={classes.button} >
                                {button}
                            </Button>
                        </Grid>

                    </Grid>
                </div>
            </div>
        </Card>
    )
}


export default CampaignCreate;