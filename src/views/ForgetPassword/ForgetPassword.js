import React, { useState, useEffect } from 'react';
import { NavLink as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {gettoken} from './../../services/api/httpclient';
import {connect} from 'react-redux';
import {setValidationTokenF, setValidationToken} from './../../redux/actions'
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ReCAPTCHA from 'react-google-recaptcha'

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const ForgetPassword = props => {
  const { history, dispatch } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [isverified, setIsverified] = React.useState(false);
  const [url, setUrl] = React.useState("");

  const recaptchaRef = React.createRef();

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: (errors ? false : true) && isverified,
      errors: errors || {}
    }));
  }, [formState.values, isverified]);
  const onSubmit = () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    this.props.onSubmit(recaptchaValue);
  }
  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handlebutton = ()=>{
    if (isverified)
    {
      let payload = {
        "useremail": formState.values.email
      }
      console.log("validationforget", formState.values.email);
      setUrl("/validation-forget?email=" + formState.values.email);

      gettoken(payload).then( ret=>{
        if (ret['data'].result === 'ok'){
            console.log("forgettoken", ret['data']['token']);
            dispatch(setValidationTokenF(ret['data']['token'], formState.values.email));
            history.push('/validation-forget');
        }
        else if(ret['data'].result === 'fail'){
          alert(ret['data'].message);
          history.push('/sign-up');
        }
        else {
          alert(ret['data'].error);
          history.push('/sign-up');
        }
      }, err => {
        alert(err.error);
        history.push('/sign-up');
      });
    }
    else{
      
    }
  } 
  const handleSignIn = event => {
    event.preventDefault();
    if (isverified)
    {
      let payload = {
        "useremail": formState.values.email
      }
      console.log("validationforget", formState.values.email);
//      setUrl("/validation-forget?email=" + formState.values.email);

      gettoken(payload).then( ret=>{
        if (ret['data'].result === 'ok'){
            console.log("forgettoken", ret['data']['token']);
           dispatch(setValidationTokenF(ret['data']['token'], formState.values.email));
           history.push('/validation-forget');
        }
        else if(ret['data'].result === 'fail'){
          alert(ret['data'].message);
          history.push('/sign-up');
        }
        else {
          alert(ret['data'].error);
          history.push('/sign-up');
        }
      }, err => {
        alert(err.error);
        history.push('/sign-up');
      });
    }
    else{
      
    }
  };
  const recaptchaverified = ()=>{
    setIsverified(true);
  }
  const recaptchatexpired = ()=>{
    setIsverified(false);
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <div className={classes.person}>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Forget Password
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <form onSubmit={onSubmit} style={{paddingTop:"10px"}}>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey="6LeLGb4ZAAAAAMdUIt6RvP1Zx0ubcWviNEivyOlV"
                    // sitekey="6Lfweb4ZAAAAALDSvvarbMFA-iSUbJKzKjOoiFM_"
                    onChange={recaptchaverified}
                    onExpired={recaptchatexpired}
                  />
                </form>
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    disabled={!formState.isValid}
                    fullWidth
                    size="large"
                    type='submit'
                    variant="contained"
                  >
                    Send Confirmation
                  </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

ForgetPassword.propTypes = {
  history: PropTypes.object
};

export default connect()(withRouter(ForgetPassword));
