import React ,{useCallback} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ShowChartIcon from '@material-ui/icons/ShowChart';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width:'100%',
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
    height: 30,
    width: 30
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

const DirectionofTraders = props => {
  const { className, shortorlong, ...rest } = props;

  const classes = useStyles();
  const getIcon = useCallback(()=>{
    console.log('aa');
    if (shortorlong === "Short")
    {
      return <ArrowDownwardIcon className={classes.differenceIcon} />
    }
    else{
      return <ArrowUpwardIcon className={classes.differenceIcon} />
    }
  })

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
              Direction of Traders
            </Typography>
            <Typography variant="h3">{shortorlong}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <ShowChartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          {getIcon()}
          {/* <ArrowDownwardIcon className={classes.differenceIcon} /> */}
          {/* <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            12%
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            Since last month
          </Typography> */}
        </div>
      </CardContent>
    </Card>
  );
};

DirectionofTraders.propTypes = {
  className: PropTypes.string
};

export default DirectionofTraders;
