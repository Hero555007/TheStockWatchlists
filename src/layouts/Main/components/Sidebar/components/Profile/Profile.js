import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { connect } from "react-redux";


const mapStateToProps = state => {
  return { username:state.user.username, userimage:state.user.userimage};
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
  const { className,username, userimage, ...rest } = props;

  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  const [userImage, setUserImage] = React.useState("");
  React.useEffect(()=>{
    if (username == "")
    {
      setUserName(localStorage.getItem('username'));
      setUserImage(localStorage.getItem('userimage'));
    }
    else{
      setUserName(username);
      setUserImage(userimage);
    }  
    if (userimage == "")
    {
      setUserImage("avatar_man.png")
    }
  },[]);


  const user = {
    name: userName,
    avatar: '/images/avatars/' + userImage,
    bio: 'Top trader'
  };

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
