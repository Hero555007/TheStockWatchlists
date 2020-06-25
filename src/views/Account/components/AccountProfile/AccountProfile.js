import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { connect } from "react-redux";
import { post } from 'axios';
import {updateprofile} from './../../../../services/api/httpclient';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';
import { setUserName } from 'redux/actions';


const mapStateToProps = state => {
  return {  username:state.user.username, userimage:state.user.userimage, useremail:state.user.useremail};
};

function mapDispatchToProps(dispatch) {
  return {
    setusername:(username, useremail, userimage)=>dispatch(setUserName(username, useremail, userimage))
  };
}
const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  filelable:{
    marginLeft: 'auto',
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  const { className,username, userimage, useremail, dispatch, setusername, ...rest } = props;

  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userImage, setUserImage] = React.useState("");
  React.useEffect(()=>{
    if (username == "")
    {
      setUserName(localStorage.getItem('username'));
      setUserEmail(localStorage.getItem('useremail'));
      setUserImage(localStorage.getItem('userimage'));
    }
    else{
      setUserName(username);
      setUserEmail(useremail);
      setUserImage(userimage);
    }  
    if (userimage == "")
    {
      setUserImage("avatar_man.png")
    }
  },[]);

  const user = {
    name: userName,
    city: 'Alabama',
    country: 'USA',
    timezone: 'GTM-7',
    avatar: '/images/avatars/' + userImage
  };
  const [image, setImage] = React.useState({ preview: "", raw: "" });
  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };
  const fileUpload =(file) => {
    const url = '/api/saveimages';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return post(url, formData,config)
  }

  const handleUpload = (e) => {
    e.preventDefault();
    fileUpload(image.raw).then((response) =>{
      console.log(response.data);
      let payload = {
        "username": userName,
        "useremail" : userEmail,
        "avatarurl": response.data['imageurl'],
      }
      updateprofile(payload).then( ret=>{
        if (ret['data'].result == 'ok'){
          console.log("picture", payload['avatarurl'])
          localStorage.setItem('userimage', payload['avatarurl']);
          setusername(userName, userEmail, payload['avatarurl']);
        }
        else if (ret['data'].result == 'fail')
        {
          alert(ret['data'].message);
        }
        else{
          alert(ret['data'].error);
        }
      }, err => {
        alert(err.error);
      });
      },(error)=>{
      console.log(error);
    })
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {user.name}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              {user.city}, {user.country}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format('hh:mm A')} ({user.timezone})
            </Typography>
          </div>
          <label htmlFor="upload-button" className={classes.filelable}>
            {image.preview?(
              <Avatar
              className={classes.avatar}
              src={image.preview}
            />
            ):(
              <Avatar
              className={classes.avatar}
              src={user.avatar}
            />  
            )}
          </label>
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={handleChange}
          />          
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          onClick={handleUpload}
        >
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountProfile);
