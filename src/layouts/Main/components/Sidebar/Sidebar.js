import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import ChatIcon from '@material-ui/icons/Chat';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonIcon from '@material-ui/icons/Person';
import { connect } from "react-redux";

import { Profile, SidebarNav } from './components';

const mapStateToProps = state => {
  return { useremail:state.user.useremail};
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
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
    marginTop:"10px"
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className,useremail,closehandle, ...rest } = props;

  const classes = useStyles();
  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Follower Users',
      href: '/users',
      icon: <PeopleIcon />
    },
    {
      title: 'Followed Users',
      href: '/fusers',
      icon: <GroupAddIcon />
    },
    {
      title: 'Global',
      href: '/products',
      icon: <ShoppingBasketIcon />
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />
    },
    // {
    //   title: 'Chat',
    //   href: '/chat',
    //   icon: <ChatIcon />
    // }
  ];
  const [userEmail, setEmail] = React.useState("");
  const [pagelist, setPagelist] = React.useState(pages);

  React.useEffect(()=>{
    if (useremail === "")
    {
      setEmail(localStorage.getItem('useremail'));
    }
    else{
      setEmail(useremail);
    }
  },[useremail]);

  React.useEffect(()=>{
    if (userEmail == "") return;
    console.log("Topbaremail", userEmail);
    if (userEmail == "admin@admin.com")
    {
      setPagelist(()=>{
        const _pagelist = [...pagelist];
        _pagelist.push({
          title: 'Admin Panel',
          href: '/admin-page-login-only',
          icon: <PersonIcon />
        })
      return _pagelist;
      })
    }
    else{
      setPagelist(()=>{
        const _pagelist = [...pagelist];
        _pagelist.push({
          title: 'Chat',
          href: '/chat',
          icon: <ChatIcon />
        })
      return _pagelist;
      })
    }
  },[userEmail]);
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
        <Profile />
        <Divider className={classes.divider} style={{marginTop:"35px"}}/>
        <SidebarNav
          className={classes.nav}
          pages={pagelist}
          cclosehandle = {cclosehandle}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
