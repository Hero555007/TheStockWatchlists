import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar, Button, TextField } from '@material-ui/core';
import {setstockpriceintervaltime} from '../../../../services/api/httpclient';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const SettingInterval = props => {
  const { className, number, ...rest } = props;
  const [intervaltime, setIntervaltime] = React.useState(5);

  const classes = useStyles();
  const setIntervalU = ()=>{
    let payload = {
        "intervaltime" : intervaltime
    }
    setstockpriceintervaltime(payload).then(ret=>{
        if (ret['data']['result'] == 'ok'){
            store.addNotification({
                title: 'Success',
                message: "Interval time setting successfully",
                type: 'success',                         // 'default', 'success', 'info', 'warning'
                container: 'top-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                  duration: 3000
                }
              })    
        }
    })
  }
  const handleintervalchange = (event)=>{
    setIntervaltime(event.target.value);
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Setting Stock Price Interval
            </Typography>
            <div style={{display:"flex"}}>
                <TextField style={{width:"50px", marginLeft:"15px", marginTop:"5px"}} onChange={handleintervalchange} placeholder={number}></TextField>
                <Typography variant="h3" style={{marginLeft:"10px", marginTop:"10px"}}>min</Typography>
            </div>
          </Grid>
          <Grid item>
            {/* <Avatar className={classes.avatar}>
              <MoneyIcon className={classes.icon} />
            </Avatar> */}
            <Button variant="outlined" style={{marginTop:"20px", color:"#00a64c"}} onClick={setIntervalU}>Set</Button>
          </Grid>
        </Grid>
        <div className={classes.difference}>
        </div>
      </CardContent>
    </Card>
  );
};

SettingInterval.propTypes = {
  className: PropTypes.string
};

export default SettingInterval;
