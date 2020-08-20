import React, {createRef, useEffect,useRef , useCallback} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import {TextField, Avatar,IconButton,Input ,InputAdornment ,Hidden } from '@material-ui/core';
import {MyChatItem, OtherChatItem} from './components';
import ScrollView, { ScrollElement } from "./components/scroller.js";
import { Divider } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import {importchat, getchat, deletechat, getuserdata} from '../../../../services/api/httpclient';
import { connect } from "react-redux";
import data from 'views/ProductList/components/TopStocks/data';
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
  root: {
    display: 'flex',
    flexDirection: 'column',    
    padding: 10,
    paddingTop:20,
    backgroundColor: '#e8e8e8',
    width: '100%',
    height: '100%'
  },
  avatar: {
    width:30,
    height: 30
  },
  sendButton: {
    margin: 0,
    padding:15
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
  searchClass:
  {
    marginTop: '10px',
    border: '0px solid',
    backgroundColor: '#ffffff',      
    width: '100%',
  },
  searchClassInput:{
    color: 'black',
    fontSize: '14px',
    input:{
      '&::placeholder': {
        color: 'blue'
      }
    }
  },
  avatar: {
    width:50,
    height: 50
  },
}));

const MyInput = withStyles({
  root: {
      backgroundColor: '#ffffff',
      width: '100%',
      padding: '10px',
      marginTop: '10px'
  },
})(TextField);

function createData(key, type, name, image, time, string) {
  return { key, type, name, image, time, string};
}
const styles = {
  'input-label': {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    color: 'red'
  },

  'input': {
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: '#8eb4df'
    }
  }
};



const MiddleWidget = (props) => {
  const { className, open, onSidebarOpen, sideEmail,sideName, sideAvatar, username, useremail,onSend,MessagFlag, ...rest } = props;
  const [text, setText] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [datas,setDatas] = React.useState([]);
  const [toName, setToname] = React.useState("");
  const [toImage, setToimage] = React.useState("");
  const [fromImage, setFromimage] = React.useState("");

  const [userName, setUserName] = React.useState("");
  const [userEmail, setEmail] = React.useState("");
  const [disableButton, setDisableButton] = React.useState(true);
  const [messageflag, setMessageflag] = React.useState(false);

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

  const classes = useStyles();

  const handleContentChanged = (event, newAlignment) => {
    if (newAlignment !== null) {
      setText(newAlignment);
    }
  }

  React.useEffect(()=>{
    if (!userName.length || !userEmail.length ) return;
    if (sideEmail == "")
    {
      console.log("sideemail is empty");
      setDatas([]);
    }
    else{
      console.log("sideemail is not empty");
      let payload = {
        'from' : userEmail,
        'to' : sideEmail
      }
      console.log("messagetest", payload);
      getchat(payload).then(ret=>{
        if (ret['data']['result'] == 'ok'){
          console.log("payload", payload);
          console.log("result", ret);
          console.log("message data",ret['data']['data']);
          setDatas(ret['data']['data']);
          ret['data']['data'].map((data=>{
            if (data.type == 1){
              setToname(data.name);
              setToimage(data.image);
            }
            else{
              setFromimage(data.image);
            }
          }))
        }
      })
    }
    let payload1 = {
      'useremail' : userEmail
    }
    getuserdata(payload1).then(ret=>{
      if(ret['data']['result'] === 'ok'){
        console.log("pmsetting",ret['data']['data']['privatemessageflag']);
        setMessageflag(ret['data']['data']['privatemessageflag']);
      }
    })

  },[userName, userEmail,sideEmail])

  const handlechange=(event)=>{
    if(event.target.value == ""){
      setDisableButton(true);
    }
    else{
      setDisableButton(false);
    }
    console.log("message",event.target.value);
    setMessage(event.target.value);  
  }

  const SendMessage=()=>{
    if (messageflag == false){
      store.addNotification({
        title: 'Info',
        message: 'Cant send the message',
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
    else if (MessagFlag == false){
      return;
    } 
    console.log("messagedatas", datas);
    console.log("message", message);
    setDatas(()=>{
      const _datas = [...datas];
      _datas.push(createData(datas.length,0,"","","",message));
      console.log("_datas", _datas);
      return _datas;
    })
    setMessage("");

    let payload = {
      'from' : userEmail,
      'to' : sideEmail,
      'content' : message
    }
    importchat(payload).then(ret=>{
      if (ret['data']['result'] == 'ok'){

      }
    })
  }

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [datas]);


  const handleDeleteMessage = (text, time)=>{
    console.log("messagedeletepropscheck",text, time);
    let payload = {
      'from' : userEmail,
      'to' : sideEmail,
      'content' : text,
      'messagedate' : time
    }
    console.log("deletemessagepayload", payload);
    deletechat(payload).then(ret=>{
      if (ret['data']['result'] == 'ok')
      {
        let payload1 = {
          'from' : userEmail,
          'to' : sideEmail
        }
        getchat(payload1).then(ret=>{
          if (ret['data']['result'] == 'ok'){
            setDatas(ret['data']['data']);
            ret['data']['data'].map((data=>{
              if (data.type == 1){
                setToname(data.name);
                setToimage(data.image);
              }
              else{
                setFromimage(data.image);
              }
            }))
          }
        })
      }    
    })
  }
  return(
    <div
      className={classes.root}
    >
        <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column'}}>
          <div style={{display:"flex"}}>
          <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
          </Hidden>
            <Avatar
            alt="Person"
            className={classes.avatar}
            src={sideAvatar}
            to="/dashboard"
            />
            <div style={{display:'flex', flexDirection: 'column', marginLeft: '10px', marginRight:'10px', paddingTop: '12px', width:"25%px"}}>
                <div style={{flex: 1, fontSize: '17px', fontFamily:"'Open Sans', sans-serif", fontWeight:"bold", color: 'black',alignItems: 'center'}}>{sideName}</div>
                {/* <div style={{flex: 1, fontSize: '13px', color: 'green',fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif', fontWeight:'bold',alignItems: 'center'}}>Active Now</div> */}
            </div>
            {/* <div style={{width:"70%"}}>
            </div> */}
          </div>
          <Divider className={classes.divider} style={{backgroundColor:"#a6a6a6"}}/>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', position: 'relative'}}>
            <div style={{position: 'absolute',paddingRight: '10px', left: 0, top: 0, right: 0, bottom: 0, overflowY: 'auto', overflowX: 'hidden'}}>
              {    
                datas.map((data) => {
                  return(
                    <div key={data.key}>
                     { data.type == 0 ? <MyChatItem message={data.string} senddate={data.lastchattime} onDelete={handleDeleteMessage}/> : <OtherChatItem messagedata={data} />}
                    </div>
                  );
                })
              }
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div style={{width: '100%',padding:"10px", marginTop:"5px", display: 'flex', backgroundColor:'white'}}>
            <Avatar
              alt="Person"
              className={classes.avatar}
              src={fromImage}
            />
            <TextField id="outlined-basic" value={message} onChange={handlechange} placeholder="Leave a message" variant="outlined" style={{width:"90%", marginLeft:"10px"}}
              onKeyPress={event=>{
                if (event.key === 'Enter'){
                  SendMessage();
                }
              }}
            />
            <IconButton
                className={classes.sendButton}
                color="inherit"
                onClick={SendMessage}
                disabled={disableButton}
              >
                <SendIcon />
              </IconButton>
              {/* <IconButton
                className={classes.sendButton}
                color="inherit"
              >
                <AttachFileIcon />
              </IconButton> */}
          </div>
        </div>
    </div>
  )
}



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MiddleWidget));