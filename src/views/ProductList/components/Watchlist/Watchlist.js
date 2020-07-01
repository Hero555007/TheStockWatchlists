import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar, Button } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ShowChartIcon from '@material-ui/icons/ShowChart';

const useStyles = makeStyles(theme => ({
  root: {
    },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 40,
    width: 40
  },
  icon: {
    height: 30,
    width: 30
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const Watchlist = props => {
  const { className, name, avatar, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Top Followed-User's Watchlist
            </Typography>
            <Typography variant="h3">{name}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar} src={avatar} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Watchlist.propTypes = {
  className: PropTypes.string
};

export default Watchlist;
