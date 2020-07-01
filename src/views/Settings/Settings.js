import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { WatchlistTemplate, ShareWatchlistTemplate } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Settings = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <WatchlistTemplate />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <ShareWatchlistTemplate />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
