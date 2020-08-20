import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {savesharewatchlisttemplate, getsharewatchlisttemplate, updatesharewatchlisttemplate} from '../../../../services/api/httpclient';
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Button
} from '@material-ui/core';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';


const mapStateToProps = state => {
  return { username:state.user.username, useremail:state.user.useremail, dashboard_type:state.common.dashboard_type};
};
function mapDispatchToProps(dispatch) {
    return {
    };
}

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const ShareWatchlistTemplate = props => {
  const { className, username, useremail,  history, ...rest } = props;

  const [userName, setUserName] = React.useState("");
  const [userEmail, setEmail] = React.useState("");
  const [initialflag, setInitialFlag] = React.useState(false);

  const [data, setData] = React.useState([
    {id : 1, name:"symbol", label:"Symbol", flag:true, checked:true},
    {id : 2, name:"sector", label:"Sector", flag:false, checked:false},
    {id : 3, name:"tradetiming", label:"Trade Timing", flag:true, checked:true},
    {id : 4, name:"shortorlong", label:"Short/Long", flag:true, checked:true},
    {id : 5, name:"tradetimeframe", label:"Trade Timeframe", flag:false, checked:false},
    {id : 6, name:"yearhigh", label:"52Weeks High", flag:true, checked:true},
    {id : 7, name:"currentprice", label:"Current StockPrice", flag:true, checked:true},
    {id : 8, name:"currentchange", label:"Change(%)", flag:true, checked:true},
    {id : 9, name:"entryprice", label:"Entry Price", flag:false, checked:false},
    {id : 10, name:"entrychange", label:"Change", flag:false, checked:false},
    {id : 11, name:"stoploss", label:"StopLoss", flag:false, checked:false},
    {id : 12, name:"tradescore", label:"TradeScore", flag:false, checked:false},
    {id : 13, name:"exitprice", label:"Exit Price", flag:false, checked:false},
    {id : 14, name:"earningdate", label:"Earning ReportDate", flag:true, checked:true},
    {id : 15, name:"alertprice", label:"Alert Price", flag:false, checked:false},
    {id : 16, name:"rewardinR", label:"Reward InR", flag:false, checked:false},
    {id : 17, name:"addedprice", label:"Initial Price", flag:false, checked:false},
    {id : 18, name:"addedpricechange", label:"Change(%)", flag:false, checked:false},
    {id : 19, name:"dateadded", label:"Date Added", flag:false, checked:false},
    {id : 20, name:"comment", label:"Comment", flag:false, checked:false}
  ]);
  
  React.useEffect(()=>{
    if (username === "")
    {
        setUserName(localStorage.getItem('username'));
    }
    else{
        setUserName(username);
    }  
    if (useremail === "")
    {
        setEmail(localStorage.getItem('useremail'));
    }
    else{
        setEmail(useremail);
    }  
    },[username, useremail]);

  const classes = useStyles();
  React.useEffect(()=>{
    if (userName==="" || userEmail==="") 
    {
        return;
    }
    let payloadforget={
        "username" : userName,
        "useremail" : userEmail,
    }
    getsharewatchlisttemplate(payloadforget).then(ret=>{
        if(ret.data.result === 'ok')
        {
            setInitialFlag(false);
            setData(()=>{
                var datas = [...data];
                datas.map(item=>{
                    if (item.name === "symbol"){
                        item.checked = ret.data.data.symbol;
                    }
                    else if(item.name === "sector"){
                        item.checked = ret.data.data.sector;
                    }
                    else if(item.name === "tradetiming"){
                        item.checked = ret.data.data.tradetiming;
                    }
                    else if(item.name === "shortorlong"){
                        item.checked = ret.data.data.shortorlong;
                    }
                    else if(item.name === "tradetimeframe"){
                        item.checked = ret.data.data.tradetimeframe;
                    }
                    else if(item.name === "yearhigh"){
                        item.checked = ret.data.data.yearhigh;
                    }
                    else if(item.name === "currentprice"){
                        item.checked = ret.data.data.currentprice;
                    }
                    else if(item.name === "currentchange"){
                        item.checked = ret.data.data.currentchange;
                    }
                    else if(item.name === "entryprice"){
                        item.checked = ret.data.data.entryprice;
                    }
                    else if(item.name === "entrychange"){
                        item.checked = ret.data.data.entrychange;
                    }
                    else if(item.name === "stoploss"){
                        item.checked = ret.data.data.stoploss;
                    }
                    else if(item.name === "exitprice"){
                        item.checked = ret.data.data.exitprice;
                    }
                    else if(item.name === "earningdate"){
                        item.checked = ret.data.data.earningdate;
                    }
                    else if(item.name === "alertprice"){
                        item.checked = ret.data.data.alertprice;
                    }
                    else if(item.name === "rewardinR"){
                        item.checked = ret.data.data.rewardinR;
                    }
                    else if(item.name === "addedprice"){
                        item.checked = ret.data.data.addedprice;
                    }
                    else if(item.name === "addedpricechange"){
                        item.checked = ret.data.data.addedpricechange;
                    }
                    else if(item.name === "dateadded"){
                        item.checked = ret.data.data.dateadded;
                    }
                    else if(item.name === "comment"){
                        item.checked = ret.data.data.comment;
                    }
                    else if(item.name === "tradescore"){
                      item.checked = ret.data.data.tradescore;
                  }
                  
                    return [item];    
                });
                return datas;
            });
        }
        else{
            setInitialFlag(true);
        }
    });
  },[userName, userEmail]);
  const onOK=() => {
    if(initialflag === true)
    {
        let payload ={
            "username" : userName,
            "useremail" : userEmail,
            "data":[]
        } ;
        data.map(item=>{
            let bufdata={
                "name" : "",
                "checked" : false,
            };
            bufdata.name = item.name;
            bufdata.checked = item.checked;
            payload.data.push(bufdata);
        })
        savesharewatchlisttemplate(payload).then( ret=>{
            if (ret['data'].result === 'ok'){
                // changeDashboardType({dashboard_type:0});
                store.addNotification({
                  title: 'Success',
                  message: 'Saved sharewatchlisttemplate',
                  type: 'success',                         // 'default', 'success', 'info', 'warning'
                  container: 'top-right',                // where to position the notifications
                  animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                  animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                  dismiss: {
                    duration: 3000
                  }
                })
                        }
            else if(ret['data'].result === 'fail'){
              store.addNotification({
                title: 'Error',
                message: 'Dont saved sharewatchlisttemplate',
                type: 'warning',                         // 'default', 'success', 'info', 'warning'
                container: 'top-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                  duration: 3000
                }
              })
            }
            else {
            }
            }, err => {
            });                          
    }
    else
    {
        let payload ={
            "username" : userName,
            "useremail" : userEmail,
            "data":[]
        } ;
        data.map(item=>{
            let bufdata={
                "name" : "",
                "checked" : false,
            };
            bufdata.name = item.name;
            bufdata.checked = item.checked;
            payload.data.push(bufdata);
        })
        updatesharewatchlisttemplate(payload).then( ret=>{
            if (ret['data'].result === 'ok'){
              store.addNotification({
                title: 'Success',
                message: 'Updated sharewatchlisttemplate',
                type: 'success',                         // 'default', 'success', 'info', 'warning'
                container: 'top-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                  duration: 3000
                }
              })
            }
            else if(ret['data'].result === 'fail'){
              store.addNotification({
                title: 'Error',
                message: 'Dont saved sharewatchlisttemplate',
                type: 'warning',                         // 'default', 'success', 'info', 'warning'
                container: 'top-right',                // where to position the notifications
                animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                dismiss: {
                  duration: 3000
                }
              })

            }
            else {
            }
            }, err => {
            });                                         
    }
  }

  const handleChange = (event) => {
    setData(()=>{
        var datas = [...data];
        datas.map(item=>{
            if (event.target === null)
            {
                return [item];
            }
            else{
                if (event.target.name === item.name)
                {
                    item.checked = event.target.checked;
                    return [item];
                }                
            }
        })
        return datas;
    });
  };


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form>
        <CardHeader
          subheader="Manage the watchlist view to share"
          title="Share Watchlist Template"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
              {
                  data.map(item=>{                        
                      let bufclassname;
                      if (item.id % 2 === 1)
                      {
                        return <FormControlLabel
                        disabled={item.flag}
                        control={
                        <Checkbox
                            checked={item.checked}
                            onChange={handleChange}
                            name={item.name}
                            color="primary"
                        />
                        }
                        label={item.label}
                    />
                        }
                  })
              }

            </Grid>
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
                {
                    data.map(item=>{                        
                        let bufclassname;
                        if (item.id % 2 === 0)
                        {
                          return <FormControlLabel
                          disabled={item.flag}
                          className={bufclassname}
                          control={
                          <Checkbox
                              checked={item.checked}
                              onChange={handleChange}
                              name={item.name}
                              color="primary"
                          />
                          }
                          label={item.label}
                      />
                          }
                    })
                }

            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
            <Button
              color="primary"
              variant="outlined"
              onClick={onOK}
            >
              Save
            </Button>
        </CardActions>
      </form>
    </Card>
  );
};

ShareWatchlistTemplate.propTypes = {
  className: PropTypes.string
};

export default connect(mapStateToProps,mapDispatchToProps)(ShareWatchlistTemplate);
