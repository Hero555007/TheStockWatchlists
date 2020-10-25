import React, { useState } from 'react';
import clsx from 'clsx';
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
  Grid
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
  root: {
    overflowX:'scroll',
    position:'relative',
    marginBottom:'10px',
  },
  content: {
    maxHeight:"370px",
    minHeight:"350px",
    alignItems: 'center',
    display: 'flex'
  },
  headerC :{
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
    backgroundColor: '#00a64c',
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
      return <Button variant="outlined" style={{color:"#00a64c"}} onClick ={() => setuser(user)}>Follow</Button>
    }
    else{
      return <Button variant="outlined" style={{color:"#00a64c"}} disabled>Follow</Button>
    }
  }
  const setuser=(rowdata)=>{
    var jwt = require('jwt-simple');
    let secret = "Hero-Hazan-Trading-Watchlist";  
    setOpen(true);
    console.log("useremail", useremail, "userEmail", userEmail)
    console.log("rowdata", rowdata);
    let payload = {
      'Suseremail' : userEmail,
      'Duseremail' : rowdata.email
    }
    let token = jwt.encode(payload, secret);
    payload = {"token": token};    
    console.log("userpayload", payload);
    setfollowers(payload).then(ret=>{
      ret['data'] = jwt.decode(ret['data']['result'].substring(2,ret['data']['result'].length - 2), secret, true);  
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
      <CardContent className={classes.content}>
      <Grid
          container
          justify="space-between"
        >
          <div style={{height:"370px", display:'flex', flexDirection:'row', position:'relative', overflowY:'scroll', width:'100%'}}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>Avatar</TableCell> */}
                  <TableCell>UserName</TableCell>
                  <TableCell>Followed<br></br>Numbers</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(FollowersList || []).map(user => (
                  <TableRow
                    key = {user.username}
                    hover
                  >
                    <TableCell>
                      <Avatar
                        aria-label="recipe"
                        className={classes.avatar}
                        src={user.avatar}
                      >{user.username.substring(0,1).toUpperCase()}</Avatar>
                      {user.username}
                    </TableCell>
                    {/* <TableCell>{user.username}</TableCell> */}
                    <TableCell>{user.numbers}</TableCell>
                    <TableCell>{setflag(user)}
                      {/* <Button variant="outlined" color="primary" onClick ={() => setuser(user)}>Follow</Button> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
};

MostFollowedUsers.propTypes = {
  className: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(MostFollowedUsers);
