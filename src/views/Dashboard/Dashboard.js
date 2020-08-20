import React, { useState,useLayoutEffect, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {
  UserPageWidget,
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  }
}));
function useWindowSize() {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

const Dashboard = () => {
  const classes = useStyles();
  const size = useWindowSize();
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    console.log("aaaaa",size);
    setWidth(ref.current.clientWidth);
  },[size]);

  const [dense, setDense] = React.useState(false);
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };
  const [pagination, setPagination] = React.useState(false);
  const handleChangePagination = (event) => {
    setPagination(event.target.checked);
  };

  return (
    <div className={classes.root} ref={ref} >
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding" style={{paddingLeft:"15px"}}
      />
      {/* <FormControlLabel
        control={<Switch checked={pagination} onChange={handleChangePagination} />}
        label="Remove pagination" style={{paddingLeft:"15px"}}
      /> */}
      <Grid
        container
        spacing={4}
      >
        <Grid style={{maxHeight:"200px"}}
          item
          lg={12}
          sm={12}
          xl={12}
          xs={12}
        >
          <UserPageWidget dense={dense} pagination={!pagination} width={width} watchid={1}/>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
