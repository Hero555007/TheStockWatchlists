const initState = {
    username: "",
    useremail : "",
    userimage : "",
    userrole:"",
    Wusername: "",
    Wuseremail : "",
    Wuserimage : "",
    Wuserrole:"",
    alertflag : "none",
    alertsymbol : "",
    token :"",
    vtoken : "",
    vtokenf: "",
    emailf:"",
    notification:{},
};

const user = (state={...initState}, action) => {
    console.log("userstateaction",state)
    console.log("useraction", action)
    switch(action.type){
        case 'USER_NAME':
            console.log("afterstate", state, action.payload)
            return {
                ...state,
                username: action.payload.username,
                useremail : action.payload.useremail,
                userimage : action.payload.userimage,
                userrole : action.payload.userrole,
            }
        case 'SET_ALERT':
            console.log("ALERT",action.payload)
            return {
                ...state,
                alertflag: action.payload.alertflag,
                alertsymbol : action.payload.alertsymbol,
            }
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            }
        case 'SET_VTOKEN':
            return {
                ...state,
                vtoken:action.payload
            }
        case 'SET_VTOKENF':
            console.log("vtokenf", action.payload);
            return {
                ...state,
                vtokenf:action.payload.vtokenf,
                emailf:action.payload.emailf,
            }
        case 'SET_WATCH_USER_INFO':
        console.log("newwatchliststate", state, action.payload)
        return {
            ...state,
            Wusername: action.payload.Wusername,
            Wuseremail : action.payload.Wuseremail,
            Wuserimage : action.payload.Wuserimage,
            Wuserrole : action.payload.Wuserrole,
        }
        case 'SET_NOTIFICATION':
            console.log("reduxnotification", state, action.payload)
            return {
                ...state,
                notification : action.payload
            }
        default:
            return {...state};
    }
}

export default user;