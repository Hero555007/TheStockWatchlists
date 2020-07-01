import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
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
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
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
  const { className, ...rest } = props;

  const classes = useStyles();

  const [user] = useState(mockData);

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
                {user.map(user => (
                  <TableRow
                    hover
                    key={user.id}
                  >
                    <TableCell>
                      <Avatar
                        alt="Person"
                        className={classes.avatar}
                        src={user.avatar}
                      />
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.numbers}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="primary">Follow</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
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
      </CardActions>
    </Card>
  );
};

MostFollowedUsers.propTypes = {
  className: PropTypes.string
};

export default MostFollowedUsers;
