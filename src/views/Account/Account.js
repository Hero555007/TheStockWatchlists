import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { AccountProfile, AccountDetails } from './components';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Account = () => {
  const classes = useStyles();
  const [datas, setDatas] = React.useState({});
  const history = useHistory();
  useEffect(()=>{
    if (localStorage.key('username') == null){
      history.push('/sign-in');
    }
  },[])


  const updatedata=(data)=>{
    console.log("profilechange", data);
    setDatas(data);
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <AccountProfile datas={datas}/>
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails  onUpdate={updatedata}/>
        </Grid>
        {/* <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <Password />
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Account;
