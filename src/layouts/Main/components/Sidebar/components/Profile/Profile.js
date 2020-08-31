import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { connect } from "react-redux";
import {getuserdata} from '../../../../../../services/api/httpclient';


const mapStateToProps = state => {
  return { useremail:state.user.useremail, userimage:state.user.userimage};
};

function mapDispatchToProps(dispatch) {
  return {
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, useremail, userimage, ...rest } = props;

  const [userEmail, setUserEmail] = React.useState("");
  const classes = useStyles();
  const [user, setUser] = React.useState(
    {
      name: "",
      avatar: '',
      bio: 'Top trader'
    }
  )
  React.useEffect(()=>{
    if (useremail === "")
    {
      setUserEmail(localStorage.getItem('useremail'));
    }
    else{
      setUserEmail(useremail);
    }  
  },[useremail]);

  React.useEffect(()=>{
    if (userEmail === ""){
      return;
    }
    var jwt = require('jwt-simple');
    let secret = "Hero-Hazan-Trading-Watchlist";
    let payload1 = {
      "useremail" : userEmail,
    }
    let token = jwt.encode(payload1, secret);
    console.log("profiletoken", token);
    payload1 = {"token": token};
    getuserdata(payload1).then((ret)=>{
      ret['data'] = jwt.decode(ret['data']['result'].substring(2,ret['data']['result'].length - 2), secret, true);  
      if (ret['data']['result'] === 'ok'){
        console.log("profileuserdata", ret['data']['data']);
        setUser(ret['data']['data']);
      }
    });
  },[userEmail, userimage]);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/dashboard"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
