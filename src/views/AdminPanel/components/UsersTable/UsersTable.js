import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import { connect } from "react-redux";
import {deleteuser,admingetuserlist} from '../../../../services/api/httpclient';
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
    minWidth: 1050
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
  const [Users, setUsers] = React.useState(users);

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
    console.log("page",page);
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    console.log("rowpage",event.target.value);
    setRowsPerPage(event.target.value);
  };

  const handleRemove = (sideEmail) =>{
    let payload={
      'useremail' : sideEmail,
    }
    console.log("removefollowers", payload);
    deleteuser(payload).then(ret=>{
      if (ret['data']['result'] === 'ok'){
        console.log("userfollowers",ret['data']['data']);
        console.log("userfollowers", payload);
        admingetuserlist().then(ret=>{
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
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < Users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>TradingYears</TableCell>
                  <TableCell>TypeofTrader</TableCell>
                  <TableCell>MessageStatus</TableCell>
                  <TableCell>ActiveStatus</TableCell>
                  <TableCell>ShareMethod</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Users.slice(page*rowsPerPage, rowsPerPage*(page+1)).map(user => (
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
                          color="primary"
                          onChange={event => handleSelectOne(event, user.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameContainer}>
                          <Avatar
                            className={classes.avatar}
                            src={user.avatarUrl}
                          >
                            {getInitials(user.name)}
                          </Avatar>
                          <Typography variant="body1">{user.name}</Typography>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.gender}</TableCell>
                      <TableCell>{user.age}</TableCell>
                      <TableCell>
                        {user.country}
                      </TableCell>
                      <TableCell>{user.tradeyears}</TableCell>
                      <TableCell>{user.typeoftrader}</TableCell>
                      <TableCell>{user.privatemessageflag}</TableCell>
                      <TableCell>{user.activeflag}</TableCell>
                      <TableCell>{user.sharemethod}</TableCell>
                      <TableCell>
                        <Button variant="outlined" color="primary" onClick={()=>handleRemove(user.email)} >Remove</Button>
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
