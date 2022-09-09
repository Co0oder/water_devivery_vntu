import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
    root: {
        position: "relative",
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '350px',
        minWidth: '300px',
        height: '500px',
        margin: "auto",
        borderRadius: '10px',
        border: '2px solid #1C9AB3',
        boxShadow: '0 5px 8px rgba(0,0,0,0.2)',
    },
    media: {
        height: 240,
        backgroundSize: 'contain',
    },
    title: {
        textAlign: 'center',
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
    row: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px',
    },
});

export default function ItemCard({ item, addItemToBasket }) {
    const classes = useStyles();
    return (
        <div style={{padding: '10px'}}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={item.image}
                    />
                    <CardContent>
                        <Typography className={classes.title} gutterBottom variant="h6" component="h5">
                            {item.title}
                        </Typography>
                        <Tooltip title={item.description} placement="top">
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.description}
                            </Typography>
                        </Tooltip>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.row}>
                    <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                        {item.price} грн.
                    </Typography>
                    <Button className={classes.button} size="small" variant="contained" onClick={() => addItemToBasket(item.id)}>
                        Додати в корзину
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
