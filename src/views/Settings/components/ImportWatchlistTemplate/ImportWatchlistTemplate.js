import React, {useCallback} from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {savewatchlisttemplate, getwatchlisttemplate, updatewatchlisttemplate} from '../../../../services/api/httpclient';
import {changeDashboardType } from '../../../../redux/actions';


const mapStateToProps = state => {
  return { username:state.user.username, useremail:state.user.useremail, dashboard_type:state.common.dashboard_type};
};
function mapDispatchToProps(dispatch) {
    return {
      changeDashboardType:payload => dispatch(changeDashboardType(payload))
    };
}
  

const useStyles = makeStyles(theme => ({
    root: {
        width:"50%",
        height:"80%",
        position:"relative",
        margin:"5% 25% 2% 25%",
        borderRadius:"3%",
        backgroundColor:"#F4F6F8",
      },
    box:{
        width:"80%",
        height:"60%",
        position:"relative",
        margin:"5% 10% 0% 10%",
        backgroundColor:"transparent"
    },
    leftcheck:{
        marginLeft:"5%",
        width:"40%",
    },
    rightcheck:{
        marginRight:"5%",
        width:"40%",
        fontSize:"20px"
    },
    okbutton:{
        width:"10%",
        margin:"10% 45% 0% 45%",
    }
}));

const ImportWatchlistTemplate = (props) => {
    const { className,username, useremail,dispatch,changeDashboardType, ...rest } = props;
     
    const [userName, setUserName] = React.useState("");
    const [userEmail, setEmail] = React.useState("");
    const [initialflag, setInitialFlag] = React.useState(false);

    React.useEffect(()=>{
    if (username == "")
    {
        setUserName(localStorage.getItem('username'));
    }
    else{
        setUserName(username);
    }  
    if (useremail == "")
    {
        setEmail(localStorage.getItem('useremail'));
    }
    else{
        setEmail(useremail);
    }  
    },[username, useremail]);

    const [data, setData] = React.useState([
        {id : 1, name:"symbol", label:"Symbol", flag:true, checked:true},
        {id : 2, name:"sector", label:"Sector", flag:true, checked:true},
        {id : 3, name:"tradetiming", label:"Trade Timing", flag:false, checked:false},
        {id : 4, name:"shortorlong", label:"Short/Long", flag:false, checked:false},
        {id : 5, name:"tradetimeframe", label:"Trade Timeframe", flag:false, checked:false},
        {id : 6, name:"yearhigh", label:"52Weeks High", flag:false, checked:false},
        {id : 7, name:"currentprice", label:"Current StockPrice", flag:false, checked:true},
        {id : 8, name:"currentchange", label:"Change(%)", flag:false, checked:true},
        {id : 9, name:"entryprice", label:"Entry Price", flag:false, checked:false},
        {id : 10, name:"entrychange", label:"Change", flag:false, checked:false},
        {id : 11, name:"stoploss", label:"StopLoss", flag:false, checked:false},
        {id : 12, name:"stoplosschange", label:"Change(%)", flag:false, checked:false},
        {id : 13, name:"exitprice", label:"Exit Price", flag:false, checked:false},
        {id : 14, name:"earningdate", label:"Earning ReportDate", flag:false, checked:true},
        {id : 15, name:"alertprice", label:"Alert Price", flag:false, checked:true},
        {id : 16, name:"rewardinR", label:"Reward InR", flag:false, checked:false},
        {id : 17, name:"addedprice", label:"Initial Price", flag:false, checked:false},
        {id : 18, name:"addedpricechange", label:"Change(%)", flag:false, checked:false},
        {id : 19, name:"dateadded", label:"Date Added", flag:false, checked:true},
        {id : 20, name:"comment", label:"Comment", flag:false, checked:false}
    ]);

    const classes = useStyles();

    React.useEffect(()=>{
        if (userName=="" || userEmail=="") 
        {
            return;
        }
        let payloadforget={
            "username" : userName,
            "useremail" : userEmail,
        }
        getwatchlisttemplate(payloadforget).then(ret=>{
            if(ret.data.result == 'ok')
            {
                setInitialFlag(false);
                setData(()=>{
                    var datas = [...data];
                    datas.map(item=>{
                        if (item.name == "symbol"){
                            item.checked = ret.data.data.symbol;
                        }
                        else if(item.name == "sector"){
                            item.checked = ret.data.data.sector;
                        }
                        else if(item.name == "tradetiming"){
                            item.checked = ret.data.data.tradetiming;
                        }
                        else if(item.name == "shortorlong"){
                            item.checked = ret.data.data.shortorlong;
                        }
                        else if(item.name == "tradetimeframe"){
                            item.checked = ret.data.data.tradetimeframe;
                        }
                        else if(item.name == "yearhigh"){
                            item.checked = ret.data.data.yearhigh;
                        }
                        else if(item.name == "currentprice"){
                            item.checked = ret.data.data.currentprice;
                        }
                        else if(item.name == "currentchange"){
                            item.checked = ret.data.data.currentchange;
                        }
                        else if(item.name == "entryprice"){
                            item.checked = ret.data.data.entryprice;
                        }
                        else if(item.name == "entrychange"){
                            item.checked = ret.data.data.entrychange;
                        }
                        else if(item.name == "stoploss"){
                            item.checked = ret.data.data.stoploss;
                        }
                        else if(item.name == "stoplosschange"){
                            item.checked = ret.data.data.stoplosschange;
                        }
                        else if(item.name == "exitprice"){
                            item.checked = ret.data.data.exitprice;
                        }
                        else if(item.name == "earningdate"){
                            item.checked = ret.data.data.earningdate;
                        }
                        else if(item.name == "alertprice"){
                            item.checked = ret.data.data.alertprice;
                        }
                        else if(item.name == "rewardinR"){
                            item.checked = ret.data.data.rewardinR;
                        }
                        else if(item.name == "addedprice"){
                            item.checked = ret.data.data.addedprice;
                        }
                        else if(item.name == "addedpricechange"){
                            item.checked = ret.data.data.addedpricechange;
                        }
                        else if(item.name == "dateadded"){
                            item.checked = ret.data.data.dateadded;
                        }
                        else if(item.name == "comment"){
                            item.checked = ret.data.data.comment;
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
        let payloadforget={
            "username" : userName,
            "useremail" : userEmail,
        }
        if(initialflag == true)
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
            savewatchlisttemplate(payload).then( ret=>{
                if (ret['data'].result == 'ok'){
                    changeDashboardType({dashboard_type:0});
                }
                else if(ret['data'].result == 'fail'){
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
            updatewatchlisttemplate(payload).then( ret=>{
                if (ret['data'].result == 'ok'){
                    changeDashboardType({dashboard_type:0});
                }
                else if(ret['data'].result == 'fail'){
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
                if (event.target == null)
                {
                    return [item];
                }
                else{
                    if (event.target.name == item.name)
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
        <div className={classes.root} >
            <div className={classes.box}>
                {
                    data.map(item=>{                        
                        let bufclassname;
                        if (item.id % 2 == 0)
                        {
                            bufclassname = classes.leftcheck;
                        }
                        else{
                            bufclassname = classes.rightcheck;
                        }
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
                    })
                }
            </div>
            <div>
                <Button variant="contained" color="primary" className={classes.okbutton} onClick={onOK}>
                    OK
                </Button>
            </div>
        </div>
    );
};

export default connect(mapStateToProps,mapDispatchToProps)(ImportWatchlistTemplate);