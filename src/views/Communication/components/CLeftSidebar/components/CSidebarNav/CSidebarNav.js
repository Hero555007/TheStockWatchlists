/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/styles';
import { List, ListItem, Button } from '@material-ui/core';
import { Divider,Avatar } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {deleteuserincontact} from '../../../../../../services/api/httpclient'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingRight:10,
    paddingBottom: 0,
    height: '60px',
    fontSize: '11pt',
    color: '#000000'
  },
  avatar: {
    width:30,
    height: 30
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
  button: {    
    padding: '0px 10px',
    display: 'flex',
    justifyContent: 'flex-start',
    textTransform: 'none',
    alignItems: 'center',
    letterSpacing: 0,
    width: '100%',
    fontSize: '15px',
    color: '#000000'
  },
  icon: {
    color: '#8eb4df',
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: '#00a64c',
    fontSize: '12px',
    // backgroundColor: '#456aac',
    // '& $button': {
    //   color: '#00a64c',
    //   '& $icon': {
    //     color: '#00a64c'
    //   },
    // }
  }
}));

const StyledListItem = withStyles({
  root: {
    backgroundColor: "#ffffff",
    "&$selected": {
      color: "#00a64c",
      '&:hover': {
        color: '#00a64c'
      },
    },
    '&:hover': {
      backgroundColor: '#f6f6f6'
    },
  },
  selected: {}
})(ListItem);

const initialState = {
  mouseX: null,
  mouseY: null,
};
const CSidebarNav = props => {
  const { pages, selected, cclosehandle, onChange, className, myemail,notificationperson, ...rest } = props;

  const classes = useStyles();
  const [state, setState] = React.useState(initialState);
  const [users, setUsers] = React.useState(pages);
  const [flag, setFlag] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const history = useHistory();

  React.useEffect(()=>{
    setUsers(()=>{
      const _pages = [];
      pages.map(item=>{
        if (item.email != "admin@admin.com"){
          _pages.push(item);
        }
      })
      return _pages;
    })
    // setUsers(pages);
  },[pages])
  const handleClick = (event) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setState(initialState);
  };

  React.useEffect(()=>{
    if (notificationperson == "") return;
    setUsers(()=>{
      const _users = [];
      users.map(item=>{
        if (notificationperson === item){
          _users.push(item);
        }
      })
      users.map(item=>{
        if (notificationperson !== item){
          _users.push(item);
        }
      })
      return _users;
    })
    // setSelectedIndex(0);
  },[notificationperson])

  const handleDelete = (selecteda) => {
    handleClose();
    console.log("deletemessage", "selecteda",selecteda);
    setState(initialState);
    if (selecteda === "") return;
    var jwt = require('jwt-simple');
    let secret = "Hero-Hazan-Trading-Watchlist";  
    let payload = {
      'from' : myemail,
      'to' : selecteda
    }
    let token = jwt.encode(payload, secret);
    payload = {"token": token};      
    console.log("deletemessagepayload", payload,  selecteda);

    deleteuserincontact(payload).then(ret=>{
      ret['data'] = jwt.decode(ret['data']['result'].substring(2,ret['data']['result'].length - 2), secret, true);  
      if (ret['data']['result'] == 'ok')
      {
        console.log("deleteuserflag");
        setUsers(()=>{
          const _users = [];
          users.map(item=>{
            if (item.email !== selecteda)
            {
              _users.push(item);
            }
          })
          return _users;
        })
      }
    })
    setFlag(true);
    onChange("","","");
//    onDelete(text, textdate);
  };
  const handleSelected = (email, name, avatar,index) => {
      // setSelectedIndex(index);
      console.log('ButtonSelected', email, name, avatar, index);
      cclosehandle(false);
      onChange(email, name, avatar);  
  }
  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {users.map(page => (
          <StyledListItem
          className={classes.item}
          // selected={selectedIndex === users.indexOf(page)}
          key={page.email}
        >
            {/* <div onContextMenu={handleClick} style={{whiteSpace: 'pre-line', fontSize:'18px', fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif', cursor:"context-menu",width: '100%', backgroundColor: 'transparent'}} > */}
          <Button activeClassName={classes.active} style={{width: '100%', height: '100%', backgroundColor: 'transparent'}} onContextMenu={handleClick} onClick={() => { handleSelected(page.email, page.name, page.avatar, users.indexOf(page))}}>          
          <Avatar
        alt="Person"
        className={classes.avatar}
        src={page.avatar}
        />
            <div
              className={classes.button}
            >
              {page.name}
            </div>

            <div style={{display:"none"}}>
              {page.email}
              <Menu
                keepMounted
                open={state.mouseY !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                  state.mouseY !== null && state.mouseX !== null
                    ? { top: state.mouseY, left: state.mouseX }
                    : undefined
                }
              >
            <MenuItem onClick={(e)=>{ e.stopPropagation(); e.preventDefault(); handleDelete(selected)}}>Delete User</MenuItem>
            </Menu>
          </div>
            <div align="right" style={{textTransform: 'none', width: '100%',  fontSize: '13px', color: 'gray'}}>{page.time}</div>
          </Button>
          {/* </div> */}
          <Divider className={classes.divider}/>
        </StyledListItem>
      ))}
    </List>
  );
};

CSidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CSidebarNav;
