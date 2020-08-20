import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import {searchglobalfollowers, getearningstocks, gettopstocks, getshortlong, gettopstocksforshortlong, getglobalfollowerslist} from '../../services/api/httpclient';
import {
  EarningReportStocks,
  MostFollowedUsers,
  DirectionofTraders,
  TopStocks,
  TopStocksforShort,
  TopStocksforLong,
  UsersToolbar,
  Watchlist
} from './components';
import LinearProgress from '@material-ui/core/LinearProgress';
import { connect } from "react-redux";


const mapStateToProps = state => {
  return { useremail:state.user.useremail};
};
function mapDispatchToProps(dispatch) {
    return {
    };
}


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const ProductList = props => {
  const classes = useStyles();
  const {  useremail } = props;

  var count = 0;
  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [shortorlong, setShortorlong] = useState('');
  const [shortdata, setShortdata] = useState([]);
  const [longdata, setLongdata] = useState([])
  const [followerslist, setFollowerslist] = useState([])
  const [openText, setOpenText] = React.useState("block");
  const [searchText, setSearchText] = React.useState("");
  const [progress, setProgress] = React.useState(0);
  const [userEmail, setEmail] = React.useState("");

  React.useEffect(()=>{
    if (useremail === "")
    {
        setEmail(localStorage.getItem('useremail'));
    }
    else{
        setEmail(useremail);
    }  
    },[ useremail]);

  React.useEffect(()=>{
    getglobalfollowerslist().then(ret=>{
      if (ret['data']['result'] === 'ok'){
        setFollowerslist(ret['data']['data']);
        setProgress(20);
        getearningstocks().then(ret=>{
          if (ret['data']['result'] === 'ok'){
            console.log("products", ret['data']['data']);
            setProducts(ret['data']['data']);
            setProgress(40);
            gettopstocks().then(ret=>{
              if (ret['data']['result'] === 'ok'){
                console.log("topproducts", ret['data']['data']);
                setStocks(ret['data']['data']);
                setProgress(60);
                getshortlong().then(ret=>{
                  if (ret['data']['result'] === 'ok'){
                    console.log("shortorlong", ret['data']['data']);
                    setShortorlong(ret['data']['data']);
                    setProgress(80);
                    gettopstocksforshortlong().then(ret=>{
                      if (ret['data']['result'] === 'ok'){
                        setProgress(100);
                        console.log("shortorlong", ret['data']['data']);
                        setShortdata(ret['data']['shortdata']);
                        setLongdata(ret['data']['longdata']);
                        setOpenText("none");
                      }
                    });
                              }
                });
                      }
            });
              }
        });
            }
    });
  },[]);

  React.useEffect(()=>{
    console.log("searchtextformostfollowerdusers", searchText);
    if (searchText === ""){
      getglobalfollowerslist().then(ret=>{
        if (ret['data']['result'] === 'ok'){
          setFollowerslist(ret['data']['data']);
        }  
      })
    }
    else{
      let payload = {
        'searchText' : searchText,
      }
      searchglobalfollowers(payload).then(ret=>{
        if (ret['data']['result'] === 'ok'){
          setFollowerslist(ret['data']['data']);
        }          
      })
    }
  },[searchText])

  const handlechange = (text) =>{
    console.log("searchTextforpropscheck", text);
    setSearchText(text);
  }

  return (
    <div className={classes.root}>
    {/* <Backdrop className={classes.backdrop} open={open}> */}
    <LinearProgress style={{display:openText}} color="primary" variant="determinate" value={progress}/>
    {/* </Backdrop> */}
      <UsersToolbar onChange={handlechange} />
      <div className={classes.content}>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={6}
            md={12}
            xl={6}
            xs={12}
          >
            <MostFollowedUsers followerslist={followerslist}/>
          </Grid>
          <Grid
            item
            lg={3}
            md={6}
            xl={3}
            xs={12}
          >
            <EarningReportStocks products={products}/>
          </Grid>
          <Grid
            item
            lg={3}
            md={6}
            xl={3}
            xs={12}
          >
            <TopStocks stocks={stocks}/>
          </Grid>
          <Grid
            item
            lg={9}
            md={12}
            xl={9}
            xs={12}
          >{
            followerslist.map(users=>{
              if (followerslist.length  <=5 )
              {
                return (
                  <Watchlist name={users.username} email={users.email} avatar={users.avatar} />
                )  
              }
              else{
                if (count < 5){
                  count = count + 1;
                  return (
                    <Watchlist name={users.username} email={users.email} avatar={users.avatar} myemail={userEmail}/>
                  )    
                }
              }
              })
          }
          </Grid>
          <Grid
            item
            lg={3}
            md={12}
            xl={3}
            xs={12}
          >
            <Grid
              lg={12}
              md={12}
              xl={12}
              xs={12}
              container
              direction="column"
              justify="space-between"
              alignItems="flex-end"
            >
              <DirectionofTraders shortorlong={shortorlong}/>
              <TopStocksforShort shortdata={shortdata}/>
              <TopStocksforLong longdata={longdata}/>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductList);
