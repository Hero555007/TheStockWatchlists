import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import PublicIcon from '@material-ui/icons/Public';
import SecurityIcon from '@material-ui/icons/Security';
import IconButton from '@material-ui/core/IconButton';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LanguageIcon from '@material-ui/icons/Language';
import {CardContent, Card} from '@material-ui/core';
import { connect } from "react-redux";
import {getsharemethod, setsharemethod} from '../../../../services/api/httpclient';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const mapStateToProps = state => {
  return { username:state.user.username, useremail:state.user.useremail};
};
function mapDispatchToProps(dispatch) {
    return {
    };
}

const useStyles = makeStyles((theme) => ({
  root:{
    padding: theme.spacing(1),
    display:"flex"
  }
}));

const SimpleTabs = props => {
  const { username, useremail } = props;
  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  const [userEmail, setEmail] = React.useState("");
  const [method, setMethod] = React.useState("");

  React.useEffect(()=>{
    if (username === "")
    {
        setUserName(localStorage.getItem('username'));
    }
    else{
        setUserName(username);
    }  
    if (useremail === "")
    {
        setEmail(localStorage.getItem('useremail'));
    }
    else{
        setEmail(useremail);
    }  
    },[username, useremail]);
  React.useEffect(()=>{
    if (userName==="" || userEmail==="") 
    {
        return;
    }
    let payload = {
      'useremail' : userEmail
    }
    console.log("sharemethodemail", payload);
    getsharemethod(payload).then(ret=>{
      console.log("sharemethodresult", ret);
      if(ret['data']['result'] === 'ok'){
        console.log("sharemethod",ret['data']['data']);
        setMethod(ret['data']['data']);
      }     
    })
  },[userName, userEmail])

  const handlePrivate = () =>{
    if(method === "2"){
      return;
    }
    else{
      let payload = {
        'useremail' : userEmail,
        'sharemethod' : '2'
      }
      setsharemethod(payload).then(ret=>{
        if(ret['data']['result'] === 'ok'){
          store.addNotification({
            title: 'Info',
            message: 'dont share your watchlist',
            type: 'info',                         // 'default', 'success', 'info', 'warning'
            container: 'top-right',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
              duration: 3000
            }
          })
    
          setMethod('2');
        }
      })
    }
  };
  const handleFollowers = () =>{
    if(method === "1"){
      return;
    }
    else{
      let payload = {
        'useremail' : userEmail,
        'sharemethod' : '1'
      }
      setsharemethod(payload).then(ret=>{
        if(ret['data']['result'] === 'ok'){
          store.addNotification({
            title: 'Info',
            message: 'share your watchlist with followers',
            type: 'info',                         // 'default', 'success', 'info', 'warning'
            container: 'top-right',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
              duration: 3000
            }
          })

          setMethod('1');
        }
      })
    }

  };
  const handleGroup = () =>{
    if(method === "0"){
      return;
    }
    else{
      let payload = {
        'useremail' : userEmail,
        'sharemethod' : '0'
      }
      setsharemethod(payload).then(ret=>{
        if(ret['data']['result'] === 'ok'){
          store.addNotification({
            title: 'Info',
            message: 'share your watchlist with your group',
            type: 'info',                         // 'default', 'success', 'info', 'warning'
            container: 'top-right',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
              duration: 3000
            }
          })

          setMethod('0');
        }
      })
    }

  };
  const handlePublic = () =>{
    if(method === "3"){
      return;
    }
    else{
      let payload = {
        'useremail' : userEmail,
        'sharemethod' : '3'
      }
      setsharemethod(payload).then(ret=>{
        if(ret['data']['result'] === 'ok'){
          store.addNotification({
            title: 'Info',
            message: 'share your watchlist for all users',
            type: 'info',                         // 'default', 'success', 'info', 'warning'
            container: 'top-right',                // where to position the notifications
            animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
            animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
            dismiss: {
              duration: 3000
            }
          })

          setMethod('3');
        }
      })
    }

  };

  return (
    <Card>
        <CardContent>
        <div className={classes.root}>
        <div style={{width:"25%"}}>
            <IconButton color={method==="2"?'secondary':'disable'} aria-label="add an private" onClick={()=>handlePrivate()}>
                <SecurityIcon />
            </IconButton>
            <p style={method==="2"?{fontWeight:"bold", color:"blue"}:{fontWeight:'lighter'}}>Private</p>
        </div>
        <div style={{width:"25%"}}>
            <IconButton color={method==="1"?'secondary':'disable'} aria-label="add an followers" onClick={()=>handleFollowers()}>
                <SupervisorAccountIcon />
            </IconButton>
            <p style={method==="1"?{fontWeight:"bold", color:"blue"}:{fontWeight:'lighter'}}>Followers</p>
        </div>
        <div style={{width:"25%"}}>
            <IconButton color={method==="0"?'secondary':'disable'} aria-label="add an group" onClick={()=>handleGroup()}>
                <LanguageIcon />
            </IconButton>
            <p style={method==="0"?{fontWeight:"bold", color:"blue"}:{fontWeight:'lighter'}}>Traders Group</p>
        </div>
        <div style={{width:"25%"}}>
            <IconButton color={method==="3"?'secondary':'disable'} aria-label="add an group" onClick={()=>handlePublic()}>
                <PublicIcon />
            </IconButton>
            <p style={method==="3"?{fontWeight:"bold", color:"blue"}:{fontWeight:'lighter'}}>Public</p>
        </div>
    </div>
        </CardContent>
    </Card>

  );
};
SimpleTabs.propTypes = {
  className: PropTypes.string
};

export default connect(mapStateToProps,mapDispatchToProps)(SimpleTabs);