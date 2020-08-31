import { SIDEMENU_RIGHT_OPEN, SIDEMENU_LEFT_OPEN, DASHBOARD_TYPE,SET_TABLE_SIZE,SET_NOTIFICATIONRR, SET_NOTIFICATION, SET_VTOKENF, CURRENT_PAGE_TYPE, USER_NAME, SET_SYMBOL, SET_ALERT,SET_TOKEN, SET_VTOKEN, SET_INTERVAL, SET_WATCH_USER_INFO } from "../constants/action-types";

export function openRightSideMenu(payload){    
    return { type: SIDEMENU_RIGHT_OPEN, payload }
}
export function openLeftSideMenu(payload){    
    return { type: SIDEMENU_LEFT_OPEN, payload }
}

export function changeDashboardType(payload){    
    return { type: DASHBOARD_TYPE, payload }
}

export function setPageType(payload){    
    return { type: CURRENT_PAGE_TYPE, payload }
}

export const setUserName = (username, useremail, userimage, userrole) =>({
    type: USER_NAME, 
    payload: {
        username, 
        useremail,
        userimage,
        userrole,
    }
})

export const setUserToken = payload =>({
    type: SET_TOKEN,
    payload,
})

export const setValidationToken = payload =>({
    type: SET_VTOKEN,
    payload,
})

export const setValidationTokenF = (vtokenf, emailf) =>({
    type: SET_VTOKENF,
    payload:{
        vtokenf,
        emailf,
    }
})

export const setSymbolName = payload =>({
    type: SET_SYMBOL,
    payload,
})

export const setNotificationR = payload =>({
    type: SET_NOTIFICATION,
    payload,
})

export const setAlert = (alertflag, alertsymbol) =>({
    type: SET_ALERT,
    payload:{
        alertflag,
        alertsymbol,
    }
})

export const setNotification = (fromname, fromimage, lastchattime, content) =>({
    type: SET_NOTIFICATIONRR,
    payload:{
        fromname,
        fromimage,
        lastchattime,
        content,
    }
})

export const setIntervaltime = payload =>({
    type: SET_INTERVAL,
    payload
})

export const setTableSize = payload =>({
    type: SET_TABLE_SIZE,
    payload
})

export const setWatchuserInfo = (Wusername, Wuseremail, Wuserimage, Wuserrole) =>({
    type: SET_WATCH_USER_INFO, 
    payload: {
        Wusername, 
        Wuseremail,
        Wuserimage,
        Wuserrole,
    }
})
