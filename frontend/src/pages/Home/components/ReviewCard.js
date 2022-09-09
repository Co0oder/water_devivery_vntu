import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import RowCenter from "../styled/RowCenter";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        position: "relative",
        maxWidth: 505,
        minWidth: 450,
        height: '280px',
        margin: "auto",
        borderRadius: '10px',
        border: '2px solid #1C9AB3',
        boxShadow: '0 5px 8px rgba(0,0,0,0.2)',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        minWidth: 140,
    }
}));

export default function MediaControlCard({item}) {
    const classes = useStyles();

    return (
            <div style={{padding: '10px'}}>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.cover}
                        image={item.avatar || 'https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png'}
                        title="Live from space album cover"
                    />
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                {item.name}
                            </Typography>
                            <RowCenter>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {item.review}
                                </Typography>
                            </RowCenter>
                        </CardContent>
                    </div>
                </Card>
            </div>
    );
}
