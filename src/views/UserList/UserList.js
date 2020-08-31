import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';
import {getfollowerslist} from '../../services/api/httpclient';
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import {useHistory} from 'react-router-dom'

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

const UserList = (props) => {
  const { className,username, useremail, ...rest } = props;
  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  const [userEmail, setEmail] = React.useState("");
  const [open, setOpen] = React.useState(true);
  const history = useHistory();
  useEffect(()=>{
    if (localStorage.key('username') == null){
      history.push('/sign-in');
    }
  },[])

  React.useEffect(()=>{
    if (username == "")
    {
      setUserName(localStorage.getItem('username'));
    }
    else{
      setUserName(username);
    }  
    if (useremail == "")
    {
      setEmail(localStorage.getItem('useremail'));
    }
    else{
      setEmail(useremail);
    }  
  },[username, useremail]);

//  const [users] = useState(mockData);
  const [users, setUsers] = React.useState([]);
  useEffect(()=>{
    if (userName != "" && userEmail != ""){
      var jwt = require('jwt-simple');
      let secret = "Hero-Hazan-Trading-Watchlist";  
      let payload={
        'useremail' : userEmail
      }
      let token = jwt.encode(payload, secret);
      payload = {"token": token};      
      console.log("userfollowers", payload);
      getfollowerslist(payload).then(ret=>{
        ret['data'] = jwt.decode(ret['data']['result'].substring(2,ret['data']['result'].length - 2), secret, true);  
        if (ret['data']['result'] == 'ok'){
          console.log("userfollowers",ret['data']['data']);
          setUsers(ret['data']['data']);
          setOpen(false);  
        }
      })
    }
  },[userName, userEmail]);


  return (
    <div className={classes.root}>
    <Backdrop className={classes.backdrop} open={open}>
    <CircularProgress disableShrink />
    </Backdrop>
      {/* <UsersToolbar /> */}
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
