import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import ReactCodeInput from 'react-verification-code-input';
import { connect } from "react-redux";
import {setactive, activeverify, resendcode} from '../../services/api/httpclient';
import {Button, Typography, IconButton} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withRouter } from 'react-router-dom';
import Timer from 'react-compound-timer'
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const mapStateToProps = state => {
    return { token:state.user.vtoken, useremail:state.user.useremail};
  };

function mapDispatchToProps(dispatch) {
    return {
    };
}
  

const useStyles = makeStyles(theme => ({
    root: {
        width:"350px",
        margin:"50px auto"
    },
    title: {
      marginTop: theme.spacing(3)
    },
  }));

const Validation = (props) => {
    const {token,history, useremail} = props;
    const [userEmail, setUserEmail] = React.useState("");
    const [code, setCode] = React.useState("");
    const [flag, setFlag] = React.useState(true);
    React.useEffect(()=>{
      if(useremail === "") 
      {
        return;
      }
      setUserEmail(useremail)
    },[useremail]);

    const handleBack = () => {
      history.goBack();
    };
    const classes = useStyles();
    const input = React.createRef();
    const onhandleChange=(vals)=>{
        // if (vals.length >= 6) {
        //     console.log('complete, ', vals);
        //     if (vals == token){
        //         let payload= {
        //           "email" : userEmail
        //         }
        //         setactive(payload).then(ret=>{
        //           if(ret['data']['result'] == 'ok')
        //           {
        //             history.push('/sign-in');
        //           }
        //         })
        //     }
        //   } else if (vals.length === 0) {
        //     console.log('empty, ', vals);
        //   }      
        setCode(vals);
    };
    const verifyOTP=()=>{
      var jwt = require('jwt-simple');
      let secret = "Hero-Hazan-Trading-Watchlist";
      let payload = {
        'useremail' : userEmail,
        'token' : code,
        'flag' : 'true'
      }
      let token = jwt.encode(payload, secret);
      payload = {"token": token};
      activeverify(payload).then(ret=>{
        ret['data'] = jwt.decode(ret['data']['result'].substring(2,ret['data']['result'].length - 2), secret, true);  
        if (ret['data']['result'] == 'ok'){
          let payload1 = {
            'email' : userEmail
          }  
          let token1 = jwt.encode(payload1, secret);
          payload1 = {"token": token1};
          setactive(payload1).then(ret=>{
            ret['data'] = jwt.decode(ret['data']['result'].substring(2,ret['data']['result'].length - 2), secret, true);  
            if (ret['data']['result'] == 'ok'){
              store.addNotification({
                title: 'Success',
                message: 'sign up proccess was done, you now able to login',
                type: 'success',                         // 'default', 'success', 'info', 'warning'
                container: 'top-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                  duration: 3000
                }
              })    
              history.push('/sign-in');
            }
          })
        }
        else{
          if (ret['data']['message']== 'activecode'){
            store.addNotification({
              title: 'Error',
              message: 'invalid activecode',
              type: 'success',                         // 'default', 'success', 'info', 'warning'
              container: 'top-right',                // where to position the notifications
              animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
              animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
              dismiss: {
                duration: 3000
              }
            })    
          }
          if (ret['data']['message']== 'time'){
            store.addNotification({
              title: 'Error',
              message: 'time expired',
              type: 'success',                         // 'default', 'success', 'info', 'warning'
              container: 'top-right',                // where to position the notifications
              animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
              animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
              dismiss: {
                duration: 3000
              }
            })    
          }
        }
      })
    }
    const resendOTP = ()=>{
      var jwt = require('jwt-simple');
      let secret = "Hero-Hazan-Trading-Watchlist";

      let payload = {
        'email' : userEmail,
        'flag' : 'true'
      }
      let token = jwt.encode(payload, secret);
      payload = {"token": token};
      resendcode(payload).then(ret=>{
        ret['data'] = jwt.decode(ret['data']['result'].substring(2,ret['data']['result'].length - 2), secret, true);  
        if (ret['data']['result'] == 'ok'){
          setFlag(false);
        }
      })
    }

    return (
      <div className={classes.root}>
        <div style={{marginTop:"30px", marginBottom:"20px", marginLeft:'200px', display:'flex'}}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography onClick={handleBack} variant="body1" color="textSecondary" style={{marginTop:'15px'}}>Go back</Typography>
        </div>        
        <ReactCodeInput
          ref={input}
          className="custom-class"
          onChange={onhandleChange}
          onComplete={val => console.log('complete', val)}
        />
        <Typography
          className={classes.title}
          variant="body1"
          color="textSecondary"
        >
          A OTP(One Time Passcode) has been sent to your email.<br></br>Please enter the OTP in the field above to verify.<br></br><br></br>And the OPT code is valid for 15minutes.
        </Typography>        
        <Button variant="contained" color="primary" style={{marginTop:"30px"}} onClick={verifyOTP}>Verify OTP</Button>
        <Button variant="outlined" style={{marginTop:"30px", float:"right"}} onClick={resendOTP}>Resend OTP</Button>
        <Typography
          hidden={flag}
          className={classes.title}
          variant="body1"
          color="textSecondary"
        >
          A new OTP has been sent to your email.
        </Typography>        
      </div>
    );
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Validation));