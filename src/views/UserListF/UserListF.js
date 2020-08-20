import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';
import {getfollowedlist} from '../../services/api/httpclient';
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

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

const UserListF = (props) => {
  const { className,username, useremail, ...rest } = props;
  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  const [userEmail, setEmail] = React.useState("");
  const [open, setOpen] = React.useState(true);

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
      let payload={
        'useremail' : userEmail
      }
      console.log("userfollowers", payload);
      getfollowedlist(payload).then(ret=>{
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

export default connect(mapStateToProps, mapDispatchToProps)(UserListF);
