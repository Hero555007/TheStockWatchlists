const initState = {
    fromname :"",
    fromimage :"",
    lastchattime :"",
    content :"",
};

const notification = (state={...initState}, action) => {
    console.log("Nuseraction", action)
    switch(action.type){
        case 'SET_NOTIFICATIONRR':
            console.log("NALERT",action.payload)
            console.log("Nafterstate", state, action.payload)
            return {
                ...state,
                fromname: action.payload.fromname,
                fromimage : action.payload.fromimage,
                lastchattime: action.payload.lastchattime,
                content : action.payload.content,
            }
        default:
            return {...state};
    }
}

export default notification;