import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

import mockData from './data';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  content: {
    padding: 0
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const TopStocks = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [products] = useState(mockData);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Top Stocks of our site"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {products.map((product, i) => (
            <ListItem
              divider={i < products.length - 1}
              key={product.id}
            >
              <ListItemAvatar>
                <img
                  alt="Product"
                  className={classes.image}
                  src={product.imageUrl}
                />
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                secondary={product.number}
              />
              <Button variant="outlined" color="primary" size="small">Detail</Button>
            </ListItem>
          ))}
        </List>
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

TopStocks.propTypes = {
  className: PropTypes.string
};

export default TopStocks;
