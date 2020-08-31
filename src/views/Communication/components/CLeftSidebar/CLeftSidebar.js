import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Drawer,Divider,TextField,InputAdornment } from '@material-ui/core';
import { CSidebarNav } from './components';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {getcontacts, getowncontacts, getuserdata} from '../../../../services/api/httpclient';
import { connect } from "react-redux";
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

const mapStateToProps = state => {
  return { username:state.user.username, useremail:state.user.useremail, userrole:state.user.userrole};
};
function mapDispatchToProps(dispatch) {
  return {
  };
}

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      margin:'240px',
      height: 'calc(100% - 64px)'
    }
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#ffffff',
    padding: 0
  },
  margin:{
    margin: theme.spacing(1,0),
    height: "30px"
  },
  marginBottom: theme.spacing(2),
  drawerPaper: {
    width: 240,
    height: '100%',
    position: 'relative',
    border: '0px solid'
  },
}));

const CLeftSidebar = (props) => {
  const { open, variant, onClose, closehandle, onChange, className,username, useremail,notificationperson, ...rest } = props;

  const classes = useStyles();

  const [pages, setPages]=React.useState([]);
  const [selected, setSelected] = React.useState('');
  const [closeText, setCloseText] = React.useState('none');
  const [searchText, setSearchText] = React.useState('');
  const [messageflag, setMessageflag] = React.useState(false);

  const handleChangeMenu = (email, name, avatar) => {
    if (email != null)
    {
      console.log('selected',email, name, avatar);
      setSelected(email);
      onChange(email, name, avatar);
    }
  }
  const [userName, setUserName] = React.useState("");
  const [userEmail, setEmail] = React.useState("");

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
  const getContacts = ()=>{
    var jwt = require('jwt-simple');
    let secret = "Hero-Hazan-Trading-Watchlist";  
    let payload = {
      'from' : userEmail
    }
    let token = jwt.encode(payload, secret);
    payload = {"token": token};      
    getowncontacts(payload).then(ret=>{
      ret['data'] = jwt.decode(ret['data']['result'].substring(2,ret['data']['result'].length - 2), secret, true);  
      if (ret['data']['result'] === 'ok'){
        console.log('contactresult', ret['data']['data']);
        setPages(ret['data']['data']);
      }
    })
  }

  React.useEffect(()=>{
    var jwt = require('jwt-simple');
    let secret = "Hero-Hazan-Trading-Watchlist";
    if (!userName.length || !userEmail.length) return;
    console.log("usernameuseremail", userName, userEmail, notificationperson);
    getContacts();

    let payload = {
      'useremail' : userEmail
    }
    let token = jwt.encode(payload, secret);
    payload = {"token": token};    
    getuserdata(payload).then(ret=>{
      ret['data'] = jwt.decode(ret['data']['result'].substring(2,ret['data']['result'].length - 2), secret, true);  
      if(ret['data']['result'] === 'ok'){
        console.log("pmsetting",ret['data']['data']['privatemessageflag']);
        setMessageflag(ret['data']['data']['privatemessageflag']);
      }
    })
  },[userName, userEmail, notificationperson])

  const handleonChange = (event) =>{
    var jwt = require('jwt-simple');
    let secret = "Hero-Hazan-Trading-Watchlist";  
    if (messageflag == false) {
      store.addNotification({
        title: 'Info',
        message: 'Cant search the users',
        type: 'success',                         // 'default', 'success', 'info', 'warning'
        container: 'top-right',                // where to position the notifications
        animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
        animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
        dismiss: {
          duration: 3000
        }
      })    
      return;
    }
    let payload = {
      "searchtext" : event.target.value,
      "useremail" : userEmail
    };
    let token = jwt.encode(payload, secret);
    payload = {"token": token};      
    setCloseText("block");
    setSearchText(event.target.value);
    if (event.target.value === "")
    {
      getContacts();
      return;
    }
    console.log("contactpayload", payload);
    getcontacts(payload).then(ret=>{
      ret['data'] = jwt.decode(ret['data']['result'].substring(2,ret['data']['result'].length - 2), secret, true);  
      if (ret['data']['result'] === 'ok'){
        setPages(ret['data']['data']);
      }
    })
  }
  const handleClickClose = ()=>{
    setCloseText('none');
    setSearchText("");
    getContacts();
  }
  const cclosehandle = (param)=>{
    closehandle(param);
  }
  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div style={{
        width: '100%', 
        color: 'black',
        fontWeight:"bold",
        fontSize: '22px',
        marginTop:"30px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'}}>
            <div>
              <h3 style={{marginBottom:"20px", fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif', marginLeft:"15px"}}>Contacts</h3>
              <TextField            
              className={classes.margin}
              id="input-with-icon-textfield"
              placeholder="Search contacts"              
              onChange={handleonChange}
              value={searchText}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment:(
                  <InputAdornment position="end" >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickClose}
                    >
                      <CloseIcon style={{display:closeText}} />
                    </IconButton>                    
                  </InputAdornment>
                )
              }}
            />
            </div>
        </div>
        <Divider className={classes.divider} />
        <CSidebarNav
          className={classes.nav}
          pages={pages}
          myemail={userEmail}
          selected={selected}
          onChange={handleChangeMenu}
          notificationperson={notificationperson}
          cclosehandle = {cclosehandle}
        />
      </div>
    </Drawer>
  );
};

CLeftSidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CLeftSidebar);
