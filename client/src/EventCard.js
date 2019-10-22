import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import Box from '@material-ui/core/Box';
import Zoom from '@material-ui/core/Zoom';
import DateCountdown from 'react-date-countdown-timer';
// import dynamic from 'next/dynamic';
// const DateCountdown = dynamic(() => import('react-date-countdown-timer'), { ssr: false });

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    position: 'absolute',
    width: '345px',
    bottom: '3px',
    right: '-179px',
    zIndex: 10,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  endText: {
    color: red[500],
  },
  startText: {
    color: green[500],
  },
}));

function EventCard({ event, cardActiveIndex }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const truncate = str => (str.length > 200 ? `${str.substring(0, 190)}...` : str);
  return (
    <div>
      {cardActiveIndex === event._id ? (
        <Zoom in={cardActiveIndex === event._id}>
          <Card className={classes.card} onClick={e => e.stopPropagation()}>
            <CardHeader
              avatar={<Avatar aria-label="recipe" src={event._user.photo} className={classes.avatar} />}
              title={event.title}
              subheader={moment(event.startTime).format('LL')}
            />
            <CardMedia className={classes.media} image={event.cover} title="Paella dish" />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {truncate(event.description)}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Typography component="div">
                <Box textAlign="left" fontSize={10} fontWeight="fontWeightBold" m={1}>
                  {moment() < moment(event.startTime) && (
                    <div className={classes.startText}>
                      <DateCountdown dateTo={event.startTime} /> to start
                    </div>
                  )}
                  {moment() > moment(event.startTime) && moment() < moment(event.endTime) && (
                    <div className={classes.endText}>
                      {' '}
                      <DateCountdown dateTo={event.endTime} /> to end
                    </div>
                  )}
                  {moment() > moment(event.endTime) && <div className={classes.endText}>event is over</div>}
                </Box>
              </Typography>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>{event.description}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Zoom>
      ) : null}
    </div>
  );
}

export default EventCard;
