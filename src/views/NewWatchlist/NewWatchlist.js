import React, { useState,useLayoutEffect, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Avatar, IconButton } from '@material-ui/core';
import {
  UserPageWidget,
} from './components';
import { useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { username:state.user.Wusername, useremail:state.user.Wuseremail, useravatar:state.user.Wuseravatar, myemail:state.user.Wuserrole};
};
function mapDispatchToProps(dispatch) {
  return {
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 40,
    width: 40,
    marginBottom:"20px"
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
}));
function useWindowSize() {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}
const NewWatchlist = (props) => {
  const {className, username, useremail, useravatar, myemail} = props;
  const history = useHistory();
  const classes = useStyles();
  const size = useWindowSize();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [avatar, setAvatar] = React.useState('');
  const [myEmail, setMyEmail] = React.useState('');
  const [flag, setFlag] = React.useState(false);
  
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  useEffect(()=>{
    console.log("dashboardlocalstoragekey",localStorage.key('username'));
    if (localStorage.key('username') == null){
      history.push('/sign-in');
    }
  },[])

  const handleBack = () => {
    history.goBack();
  };
  useEffect(() => {
    console.log("aaaaa",size);
    setWidth(size);
  },[size]);

  React.useEffect(()=>{
    console.log("newwatchlistprops", username, useremail, myemail);
    if (username == "" || useremail == "" || myemail == "") return;
      setName(username);
      setEmail(useremail);
      setAvatar(useravatar);
      setMyEmail(myemail);
      setFlag(true);
  },[username, useremail, useravatar, myemail])

  return (
    <div className={classes.root}>
      <Grid
        container
      >
        <Grid
          item
          lg={12}
          xs={12}
        >
          <div style={{display:'flex'}}>
              <IconButton onClick={handleBack} style={{marginRight:"30px", marginBottom:"30px"}}>
                <ArrowBackIcon />
              </IconButton>
              <Avatar className={classes.avatar} src={avatar} >{name.substring(0,1).toUpperCase()}</Avatar>
            <h2 style={{marginLeft:"10px", marginTop:"5px", fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif'}}>{name}</h2>
          </div>
          {
            flag == true ? <UserPageWidget userName={name} userEmail={email} userImage={avatar} myEmail={myEmail} width={width} /> : <div></div>
          }
        </Grid>
      </Grid>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NewWatchlist);
