import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {CardContent, Card} from '@material-ui/core';
import { connect } from "react-redux";
import {TextField, Button} from '@material-ui/core'

const mapStateToProps = state => {
  return { username:state.user.username, useremail:state.user.useremail};
};
function mapDispatchToProps(dispatch) {
    return {
    };
}

const useStyles = makeStyles((theme) => ({
  root:{
    padding: theme.spacing(1),
    display:"flex",
    flexDirection:'column'
  }
}));

const AddNewColumnForWatchlist = props => {
  const { username, useremail } = props;
  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  const [userEmail, setEmail] = React.useState("");

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
  React.useEffect(()=>{
    if (userName==="" || userEmail==="") 
    {
        return;
    }

  },[userName, userEmail])

  return (
    <Card>
        <CardContent>
          <div className={classes.root}>
            <div style={{width:'100%'}} >
              <TextField id="outlined-basic1" label="Name" variant="outlined" style={{marginLeft:'3.5%', marginRight:'3%', marginTop:'-12px', width:'20%'}}/>
              <TextField id="outlined-basic2" label="Value" variant="outlined" style={{marginRight:'7%', marginTop:'-12px', width:'20%'}}/>
              <TextField id="outlined-basic3" label="Name" variant="outlined" style={{marginRight:'3%', marginTop:'-12px', width:'20%'}}/>
              <TextField id="outlined-basic4" label="Value" variant="outlined" style={{marginRight:'3.5%', marginTop:'-12px', width:'20%'}}/>
              <Button variant="outlined" color="primary" style={{marginTop:'10px', marginLeft:'15%'}} >Add Column</Button>
              <Button variant="outlined" color="primary" style={{marginTop:'10px', marginLeft:'30%'}}>Add Column</Button>
            </div>
            {/* <div style={{width:'100%'}} >
            </div> */}
          </div>
        </CardContent>
    </Card>

  );
};
AddNewColumnForWatchlist.propTypes = {
  className: PropTypes.string
};

export default connect(mapStateToProps,mapDispatchToProps)(AddNewColumnForWatchlist);