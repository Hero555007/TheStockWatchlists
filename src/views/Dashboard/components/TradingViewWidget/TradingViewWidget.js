import React, {useEffect, useLayoutEffect} from 'react';
import { makeStyles} from '@material-ui/styles';
import TradingMainViewWidget from './TradingMainViewWidget';
import { connect } from "react-redux";

const mapStateToProps = state => {
};
function mapDispatchToProps(dispatch) {
  return {
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0),
    display: 'flex',
    width: '100%', 
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  gridContainer:{
    padding: 0,
    margin: 0
  },
  leftSide:{
    display: 'flex', 
    width: '40px',
    
    [theme.breakpoints.down('sm')]: {      
      width: '100%',
      padding: '10px'
    },
  },
  middleSide: {
    flex: 1, height: '100%', display: 'flex'
  },
  middleSubSide: {
    flex: 1, display: 'flex', height: '100%', flexWrap: 'nowrap',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexDirection: 'column',    
      padding: '10px'  
    },
  },
  tradeHistoryContainer:{
    height: '100%', 
    position: 'relative',
    //width: '222px',
    width: '22.7%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',      
      paddingTop: '10px',
      minHeight: '600px'
    },
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
   
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },



}));

const TradingViewWidget = (props) => {
  const classes = useStyles();
  const {symbol} = props

  const [openSidebar, setOpenSidebar] = React.useState(false);
  const handleSidebarOpen = () => {    
    
    if (openSidebar == true)
    {
       
    }
    else
    {
        setOpenSidebar(true);
    }
    
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  useLayoutEffect(() => {
    console.log('layout effect');
    // if (size != mRef1.current.offsetWidth)
    // {
    //   setSize(mRef1.current.offsetWidth);
    // }
    
});
  useEffect(() => {
    // console.log("symbol", symbol);
    // setSymbolName(symbol);
  },[]);

  
  return (
    <div className={classes.root}>
      <div className={classes.middleSide}>
        <TradingMainViewWidget symbol = {symbol} handleSidebarOpen={handleSidebarOpen} handleSidebarClose={handleSidebarClose} openSidebar={openSidebar}/>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TradingViewWidget);