import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    backgroundColor: 'transparent',
    fontSize: '11px',
    color: 'black',
    display: 'flex', 
    flexDirection: 'column'  
  },
  content:
  {
    backgroundColor: '#ffffff',
    padding: '15px',
    borderRadius: 15,
    borderTopLeftRadius: 0,
    marginTop: '10px',
    marginRight:'30px'
  },
  avatar: {
    width:35,
    height: 35
  },
}));

const OtherChatItem = (props) => {
  const {  messagedata } = props;
  const classes = useStyles();
  
  return (
    <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%'}}>
      <div className={classes.root}>
        <div style={{display: 'flex'}}>
          <div style={{fontSize: '10.89px', color: '#42c596', display:'flex', alignItems: 'center'}}>
          <Avatar
        alt="Person"
        className={classes.avatar}
        src={messagedata.image}
        />
          </div>
          <div style={{display:'flex', flexDirection: 'column', marginLeft: '10px', paddingTop: '8px'}}>
              <div style={{flex: 1, fontSize: '17px', fontFamily:"'Open Sans', sans-serif", fontWeight:"bold", color: 'black',alignItems: 'center'}}>{messagedata.name}</div>
              <div style={{flex: 1, fontSize: '13px', color: 'blue',fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif', fontWeight:'bold',alignItems: 'center',color:"#00a64c"}}>{messagedata.time}</div>
          </div>
        </div>
        <div className={classes.content}>
          <span style={{whiteSpace: 'pre-line', fontSize:'18px',fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif'}} >
            {messagedata.string}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OtherChatItem;
