import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    marginTop:'20px'
  },
  content: {
    padding: 0,
    maxHeight:'350px',
    overflowY:'scroll'
  },
  image: {
    height: 48,
    width: 48
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const TopStocksforLong = props => {
  const { className,longdata, ...rest } = props;

  const classes = useStyles();

  // const [products] = useState(mockData);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        subtitle={`${longdata.length} in total`}
        title="Top Stocks for Long"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {longdata.map((product, i) => (
            <ListItem
              divider={i < longdata.length - 1}
              key={product.id}
            >
              <ListItemAvatar style={{marginLeft:"50px"}}>
                <img
                  alt="Product"
                  className={classes.image}
                  src={product.imageUrl}
                />
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                secondary={product.number}
                style={{marginLeft:"30px"}}
              />
            </ListItem>
          ))}
        </List>
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
  );
};

TopStocksforLong.propTypes = {
  className: PropTypes.string
};

export default TopStocksforLong;
