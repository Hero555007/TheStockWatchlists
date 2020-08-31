import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { connect } from "react-redux";
import {deletefollower,getfollowerslist} from '../../../../services/api/httpclient';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Button
} from '@material-ui/core';

import { getInitials } from 'helpers';

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
    padding: 0
  },
  inner: {
    minWidth: 300
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const UsersTable = props => {
  const { className, users,  useremail, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [userEmail, setEmail] = React.useState("");
  const [Users, setUsers] = React.useState([]);

  React.useEffect(()=>{
    setUsers(users);
  },[users]);
  
  React.useEffect(()=>{
    if (useremail === "")
    {
      setEmail(localStorage.getItem('useremail'));
    }
    else{
      setEmail(useremail);
    }  
  },[useremail]);

  const handleSelectAll = event => {

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = Users.map(user => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const handleRemove = (sideEmail) =>{
    var jwt = require('jwt-simple');
    let secret = "Hero-Hazan-Trading-Watchlist";  
    let payload={
      'useremail' : userEmail,
      'sideemail' : sideEmail
    }
    let token = jwt.encode(payload, secret);
    payload = {"token": token};      
    console.log("removefollowers", payload);
    deletefollower(payload).then(ret=>{
      ret['data'] = jwt.decode(ret['data']['result'].substring(2,ret['data']['result'].length - 2), secret, true);  
      if (ret['data']['result'] === 'ok'){
        console.log("userfollowers",ret['data']['data']);
        console.log("userfollowers", payload);
        getfollowerslist(payload).then(ret=>{
          ret['data'] = jwt.decode(ret['data']['result'].substring(2,ret['data']['result'].length - 2), secret, true);  
          if (ret['data']['result'] === 'ok'){
            console.log("userfollowers",ret['data']['data']);
            setUsers(ret['data']['data']);
          }
        })
      }
    })
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === Users.length}
                      style={{color:"#00a64c"}}
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < Users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell align="center">Name</TableCell>
                  {/* <TableCell>Email</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Phone</TableCell> */}
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Users.slice(0, rowsPerPage).map(user => (
                  <>
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={user.id}
                      selected={selectedUsers.indexOf(user.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox                          
                          checked={selectedUsers.indexOf(user.id) !== -1}
                          style={{color:"#00a64c"}}
                          onChange={event => handleSelectOne(event, user.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <div className={classes.nameContainer}>
                          <Avatar
                            className={classes.avatar}
                            src={user.avatarUrl}
                          >
                            {getInitials(user.name)}
                          </Avatar>
                          <Typography variant="body1">{user.name}</Typography>
                        </div>
                      </TableCell >
                      {/* <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.address.country}
                      </TableCell>
                      <TableCell>{user.phone}</TableCell> */}
                      <TableCell align="center">
                        <Button variant="outlined" style={{color:"#00a64c"}} onClick={()=>handleRemove(user.email)} >Remove</Button>
                      </TableCell>
                    </TableRow>
                    
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={Users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
