import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#0f1e35',
    height : '100%',
    padding: '20px',
    overflow: 'auto'
    // display: 'flex',
    // flexDirection: 'column',
  },
  titleClass: {
    fontSize: '10px',
    color: '#95c0e9',
    marginLeft: '5px'
  },
  coinLabelClass: {
    fontSize: '16px',
    color: 'white',
    marginLeft: '5px'
  },
  paragraphRootClass:{
    borderBottom: '1px solid #13243e',
    width: '100%',
    // height: '100%',
    paddingBottom: '15px',
    display: 'flex',
    flexDirection: 'column'
  },
  paragraphTitleClass:{
    fontSize: '10px',
    color: '#95c0e9',
  },
  paragraphContentClass:{
    marginTop: '10px',
    fontSize: '13px',
    color: 'white',
  }
}));

const DataWidget = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
      >
        <Grid
          item
          lg={4}
          xs={12}
          style={{width: '100%', height: '100%'}}
        >
          <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '20px'}}>
            <Icon style={{marginRight: '10px', width: '45px', height: '45px', justifyContent: 'center'}}>
            </Icon>
            <div className={classes.titleClass} style={{marginTop: '30px'}}>NAME</div>
            <div className={classes.coinLabelClass} style={{marginTop: '15px'}}></div>
          </div>
        </Grid>
        <Grid
          item
          lg={8}
          xs={12}
        >
          <div style={{width: '100%', height: '100%', padding: '20px'}}>
          </div>
        </Grid>
        
      </Grid>
    </div>
  );
};

export default DataWidget;
