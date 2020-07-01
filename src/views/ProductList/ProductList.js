import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {getglobalWatchlist} from '../../services/api/httpclient';
import {
  EarningReportStocks,
  MostFollowedUsers,
  DirectionofTraders,
  TopStocks,
  TopStocksforShort,
  TopStocksforLong,
  UsersToolbar,
  Watchlist
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const ProductList = () => {
  const classes = useStyles();

  const [products, setProducts] = useState([]);

  React.useEffect(()=>{
    getglobalWatchlist().then(ret=>{
      if (ret['data']['result'] == 'ok'){
        
      }
    })
  },[]);

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
            <MostFollowedUsers />
          </Grid>
          <Grid
            item
            lg={3}
            md={6}
            xl={3}
            xs={12}
          >
            <EarningReportStocks />
          </Grid>
          <Grid
            item
            lg={3}
            md={6}
            xl={3}
            xs={12}
          >
            <TopStocks />
          </Grid>
          <Grid
            item
            lg={9}
            md={12}
            xl={9}
            xs={12}
          >
            <Watchlist name={"Meir"} avatar={"/images/avatars/avatar_man.png"}/>
            <Watchlist name={"Meir"} avatar={"/images/avatars/avatar_man.png"}/>
            <Watchlist name={"Meir"} avatar={"/images/avatars/avatar_man.png"}/>
            <Watchlist name={"Meir"} avatar={"/images/avatars/avatar_man.png"}/>
          </Grid>
          <Grid
            item
            lg={3}
            md={12}
            xl={3}
            xs={12}
          >
            <Grid
              lg={12}
              md={12}
              xl={12}
              xs={12}
              container
              direction="column"
              justify="space-between"
              alignItems="flex-end"
            >
              <DirectionofTraders />
              <TopStocksforShort />
              <TopStocksforLong />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ProductList;
