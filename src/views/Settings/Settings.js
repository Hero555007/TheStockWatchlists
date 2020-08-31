import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { WatchlistTemplate, ShareWatchlistTemplate, SimpleTabs, AddNewColumnForWatchlist } from './components';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Settings = () => {
  const classes = useStyles();
  const history = useHistory();
  useEffect(()=>{
    if (localStorage.key('username') == null){
      history.push('/sign-in');
    }
  },[])


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
        {/* <Grid
          item
          md={6}
          xs={12}
        >
          <AddNewColumnForWatchlist />
        </Grid> */}
        <Grid
          item
          md={6}
          xs={12}
        >
          <SimpleTabs />
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
