import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { Avatar, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import {setfollowers} from '../../../../services/api/httpclient'
import { connect } from "react-redux";

import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import user from 'redux/reducers/user';
import { object } from 'underscore';

const mapStateToProps = state => {
  return { useremail:state.user.useremail};
};
function mapDispatchToProps(dispatch) {
  return {
  };
}
const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0,
    maxHeight:"370px",
    minHeight:"350px",
    overflowY:'scroll',
    overflowX:'scroll'
  },
  inner: {
    minWidth: 600
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  avatar: {
    backgroundColor: 'blue',
    width: 30,
    height: 30
  },
}));

const statusColors = {
  delivered: 'success',
  pending: 'info',
  refunded: 'danger'
};

const MostFollowedUsers = props => {
  const { className, followerslist,useremail, ...rest } = props;

  const classes = useStyles();
  const [userEmail, setEmail] = React.useState("");
  const [open,setOpen] = React.useState(false);
  const [FollowersList, setFollowersList] = React.useState([]);

  React.useEffect(()=>{
    console.log("followersList", followerslist);
    if (useremail == "")
    {
      setEmail(localStorage.getItem('useremail'));
    }
    else{
      setEmail(useremail);
    }  
  },[useremail]);

  React.useEffect(()=>{
    console.log("followersList", followerslist);
    console.log("followersList", typeof(followerslist[0]) );
    followerslist.map(user=>{
      console.log("followListMap",user.email);
    });
    setFollowersList(followerslist);
  },[followerslist]);
  const flag = true;

  const setflag=(user)=>{
    if (user.email != userEmail){
      return <Button variant="outlined" color="primary" onClick ={() => setuser(user)}>Follow</Button>
    }
    else{
      return <Button variant="outlined" color="primary" disabled>Follow</Button>
    }
  }
  const setuser=(rowdata)=>{
    setOpen(true);
    console.log("useremail", useremail, "userEmail", userEmail)
    console.log("rowdata", rowdata);
    let payload = {
      'Suseremail' : userEmail,
      'Duseremail' : rowdata.email
    }
    console.log("userpayload", payload);
    setfollowers(payload).then(ret=>{
      if (ret['data']['result'] == 'ok'){
        console.log("ok");
        console.log("followlist", FollowersList);
        setFollowersList(()=>{
          const _followerlist = [];
          followerslist.map(item=>{
            if (item.username == rowdata.username){
              item.numbers += 1;
            }
            _followerlist.push(item);
          })
          return _followerlist;
        })
        setOpen(false);
      }
    })
  };
  // const [user] = useState(mockData);

  return (
    <>
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        // action={
        //   <Button
        //     color="primary"
        //     size="small"
        //     variant="outlined"
        //   >
        //     New entry
        //   </Button>
        // }
        title="Most-Followed Users"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>UserName</TableCell>
                  <TableCell>Followed Numbers</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(FollowersList || []).map(user => (
                  <TableRow
                    hover
                    key={user.id}
                  >
                    <TableCell>
                      <Avatar
                        aria-label="recipe"
                        className={classes.avatar}
                        src={user.avatar}
                      >{user.username.substring(0,1).toUpperCase()}</Avatar>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.numbers}</TableCell>
                    <TableCell>{setflag(user)}
                      {/* <Button variant="outlined" color="primary" onClick ={() => setuser(user)}>Follow</Button> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      {/* <CardActions className={classes.actions}>
        <Button
            color="primary"
            size="small"
            variant="text"
        >
          <ArrowLeftIcon /> Previous 
        </Button>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          Next <ArrowRightIcon />
        </Button>
      </CardActions> */}
    </Card>
    </>
  );
};

MostFollowedUsers.propTypes = {
  className: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(MostFollowedUsers);
