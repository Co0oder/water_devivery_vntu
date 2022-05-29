import React, {useEffect, useState} from 'react';
import {Divider} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from "@material-ui/core/Button";
import Modal from "../../../common/components/Modal/Modal";
import TitleText from "../styled/TitleText";
import BasketModalWrap from "../styled/BasketModalWrap";
import {i18n, keys} from '../../../i18n';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    title: {
        color: '#1C9AB3',
    },
    button: {
        background: '#1C9AB3',
        color: 'white',
        borderRadius: '10px',
        padding: '5px 10px',
        '&:hover': {
            backgroundColor: '#116979',
        },
    },
    relative: {
        width: '80px',
        position: "relative",
        display: "flex",
        justifyContent: "center",
    },
    delete: {
        position: "absolute",
        bottom: '8px',
        '&:hover': {
            color: '#b14040',
        },
    }
}));

const WATER_ID = 33
function BasketModal({ show, onHide, itemsInBasket, changeCounter, submitBasket }) {
    const classes = useStyles();

    const getItemPrice = (item) => {
        if (item.id === WATER_ID && item.count >= 5) return 35 * item.count;
        return item.price * item.count;
    }
    return (
        <Modal show={show} onHide={onHide}>
            <BasketModalWrap>
                <TitleText color="black" size="25" style={{paddingBottom: '30px'}}>{i18n.t(keys.basket.title).toUpperCase()}</TitleText>
                <List className={classes.root}>
                    {
                        itemsInBasket.map((item, index) =>
                            <Grid key={item.id} container spacing={2}>
                                <Grid item>
                                    <ButtonBase className={classes.image}>
                                        <img className={classes.img} alt="complex" src={item.image} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography className={classes.title} gutterBottom variant="subtitle1">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {item.description}
                                            </Typography>
                                                 <React.Fragment >
                                                     <IconButton onClick={() => changeCounter(index, 'reduce')}
                                                                 className={classes.plus} aria-label="delete">
                                                         <RemoveIcon />
                                                     </IconButton>
                                                     <Typography className={classes.counter} gutterBottom variant="h5" component="span">
                                                         {item.count}
                                                     </Typography>
                                                     <IconButton onClick={() => changeCounter(index, 'increase')}
                                                                 className={classes.plus} aria-label="delete">
                                                         <AddIcon />
                                                     </IconButton>
                                                 </React.Fragment>
                                        </Grid>
                                    </Grid>
                                    <Grid className={classes.relative} item>
                                        <Typography variant="subtitle1">{getItemPrice(item)} грн.</Typography>
                                        <IconButton onClick={() => changeCounter(index, 'delete')}
                                                    className={classes.delete} aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>

                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    }
                    {
                        itemsInBasket.length === 0 ?
                            <Typography variant="body1" color="textSecondary">
                                {i18n.t(keys.basket.noItems)}
                            </Typography> :
                            <><
                                Divider style={{margin: '20px 0', width: '100%'}} />
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Typography variant="subtitle1">{i18n.t(keys.basket.sum)} {itemsInBasket.reduce((acc, item) => acc + getItemPrice(item), 0)}</Typography>
                                    <Button className={classes.button} size="small" variant="contained" onClick={submitBasket}>
                                        {i18n.t(keys.modals.order.button)}
                                    </Button>
                                </div>
                            </>
                    }

                </List>
            </BasketModalWrap>
        </Modal>
    )
}

export default BasketModal;
