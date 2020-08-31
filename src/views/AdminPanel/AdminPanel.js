import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable, Budget, CurrentlyLogUser, DayLogUser, SettingInterval, TotalUser } from './components';
import {admingetuserlist, getcurrentstockprice, getlogedusersnumber, gettotalusersnumber, getstockpriceintervaltime, getcurrentusersnumber} from '../../services/api/httpclient';
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const mapStateToProps = state => {
  return { username:state.user.username, useremail:state.user.useremail};
};
function mapDispatchToProps(dispatch) {
  return {
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'blue',
  },
}));

const AdminPanel = (props) => {
  const { className,username, useremail, ...rest } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState("");
  const [loggedUser, setLoggedUser] = React.useState("");
  const [totalUser, setTotalUser] = React.useState("");
  const [intervaltime, setIntervalTime] = React.useState("");
  const history = useHistory();
  useEffect(()=>{
    if (localStorage.key('username') == null){
      history.push('/sign-in');
    }
    else if (localStorage.getItem('username') != "admin")
    {
      history.push('/sign-in');
    }
  },[])


//  const [users] = useState(mockData);
  const [users, setUsers] = React.useState([]);
  useEffect(()=>{
    console.log("adminuser")
    admingetuserlist().then(ret=>{
      if (ret['data']['result'] == 'ok'){
          console.log("adminuserok")
        console.log("userfollowers",ret['data']['data']);
        setUsers(ret['data']['data']);
        setOpen(false);
        getcurrentusersnumber().then(ret=>{
          console.log("currentinterval", ret);
          if (ret['data']['result'] == 'ok'){
            setCurrentUser(ret['data']['data']);
            getlogedusersnumber().then(ret=>{
              console.log("currentinterval", ret);
              if (ret['data']['result'] == 'ok'){
                setLoggedUser(ret['data']['data']);
                console.log("currentinterval", ret);
                gettotalusersnumber().then(ret=>{
                  console.log("currentinterval", ret);
                  if (ret['data']['result'] == 'ok'){
                    setTotalUser(ret['data']['data']);
                    console.log("currentinterval", ret);
                    getstockpriceintervaltime().then(ret=>{
                      if (ret['data']['result'] == 'ok'){
                        setIntervalTime(ret['data']['data']);
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },[]);


  return (
    <div className={classes.root}>
    <Backdrop className={classes.backdrop} open={open}>
    <CircularProgress disableShrink />
    </Backdrop>
    <Grid
      container
      spacing={4}
    >
      <Grid
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
      >
        <CurrentlyLogUser number={currentUser} />
      </Grid>
      <Grid
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
      >
        <DayLogUser number={loggedUser} />
      </Grid>
      <Grid
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
      >
        <TotalUser number={totalUser} />
      </Grid>
      <Grid
        item
        lg={3}
        sm={6}
        xl={3}
        xs={12}
      >
        <SettingInterval number={intervaltime} />
      </Grid>
      <Grid
        item
        lg={12}
        sm={12}
        xl={12}
        xs={12}
      >
        <div className={classes.content}>
          <UsersTable users={users} />
        </div>
      </Grid>
    </Grid>
      {/* <UsersToolbar /> */}
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel);
