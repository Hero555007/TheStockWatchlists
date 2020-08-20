import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
    margin:'5px',
    fontSize: '13px',
    color: 'white',
    backgroundColor: '#007fed' ,
    padding: '15px',
    borderRadius: 15,
    borderTopRightRadius: 0,
    marginLeft:'30px'
  },
  searchClass:
  {
    marginLeft: '5px',
    border: '0px solid',
  },
  
}));
const initialState = {
  mouseX: null,
  mouseY: null,
};

const MyChatItem = (props) => {
  const { message, senddate,onDelete } = props;
  const classes = useStyles();
  const [state, setState] = React.useState(initialState);

  const handleClick = (event) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setState(initialState);
  };

  const handleDelete = (text,textdate) => {
    console.log("deletemessage", text, textdate);
    setState(initialState);
    onDelete(text, textdate);
  };
  
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
    <div  className={classes.root}>
      <div onContextMenu={handleClick} style={{whiteSpace: 'pre-line', fontSize:'18px', fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif', cursor:"context-menu"}} >
        {message}
        <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={()=>handleDelete(message, senddate)}>Delete</MenuItem>
      </Menu>
      </div>
    </div>
    </div>
  );
};

export default MyChatItem;
