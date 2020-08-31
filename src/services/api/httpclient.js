import {post , put , get , del} from './index';

const signupPath = 'api/register';
const signinPath = 'api/login';
const getsymbolPath = 'api/getsymbollist'
const getsectorPath = 'api/getsector'
const savewatchlistPath = 'api/importwatchlist'
const deletewatchlistPath = 'api/deletewatchlist'
const updatewatchlistPath = 'api/updatewatchlist'
const getwatchlistPath = 'api/getwatchlist'
const changeviewstatusPath = 'api/changeviewstatus'
const getcurrentstockpricePath = 'api/currentprice'
const savewatchlisttemplatePath = 'api/importwatchlisttemplate'
const getwatchlisttemplatePath = 'api/getwatchlisttemplate'
const updatewatchlisttemplatePath = 'api/updatewatchlisttemplate'
const updateprofilePath = 'api/updateprofile'
const validwatchlistPath = 'api/validwatchlist'
const getuserdataPath = 'api/getuserdata'
const savesharewatchlisttemplatePath = 'api/importsharewatchlisttemplate'
const getsharewatchlisttemplatePath = 'api/getsharewatchlisttemplate'
const updatesharewatchlisttemplatePath = 'api/updatesharewatchlisttemplate'
const getglobalwatchlistPath = 'api/getglobalwatchlist'
const searchglobalfollowersPath = 'api/searchglobalfollowers'
const getearningstocksPath = 'api/getearningstocks'
const gettopstocksPath = 'api/gettopstocks'
const getshortlongPath = 'api/getshortlong'
const gettopstocksforshortlongPath = 'api/gettopstocksforshortlong'
const getfollowerslistPath = 'api/getfollowerslist'
const getfollowedlistPath = 'api/getfollowedlist'
const deletefollowerPath = 'api/deletefollower'
const getglobalfollowerslistPath = 'api/getglobalfollowerslist'
const setfollowersPath = 'api/setfollowers'
const getfollowersPath = 'api/getfollowers'
const getcontactsPath = 'api/getcontacts'
const setcontactsPath = 'api/setcontacts'
const importchatPath = 'api/importchat'
const savecontactsPath = 'api/savecontact'
const getchatPath = 'api/getchat'
const readchatPath = 'api/readchat'
const getchatfornotificationPath = 'api/getchatfornotification'
const deletechatPath = 'api/deletechat'
const getowncontactsPath = 'api/getowncontacts'
const getsharemethodPath = 'api/getsharemethod'
const setsharemethodPath = 'api/setsharemethod'
const deleteuserincontactPath = 'api/deleteuserincontact'
const setactivePath = 'api/setactive'
const gettokenPath = 'api/gettoken'
const resetpasswordPath = 'api/resetpassword'
const admingetuserlistPath = 'api/admingetuserlist'
const deleteuserPath = 'api/deleteuser'
const activeverifyPath = 'api/activeverify'
const resendcodePath = 'api/resendcode'
const validgroupuserPath = 'api/validgroupuser'
const setstockpriceintervaltimePath = 'api/setstockpriceintervaltime'
const getcurrentusersnumberPath = 'api/getcurrentusersnumber'
const getlogedusersnumberPath = 'api/getlogedusersnumber'
const gettotalusersnumberPath = 'api/gettotalusersnumber'
const getstockpriceintervaltimePath = 'api/getstockpriceintervaltime'
const logoutPath = 'api/logout'

export function logout(data){
    return new Promise((resolve,reject) =>
        post(logoutPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getstockpriceintervaltime(data){
    return new Promise((resolve,reject) =>
        get(getstockpriceintervaltimePath, null, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}
export function gettotalusersnumber(data){
    return new Promise((resolve,reject) =>
        get(gettotalusersnumberPath, null, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}
export function getlogedusersnumber(data){
    return new Promise((resolve,reject) =>
        get(getlogedusersnumberPath, null, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getcurrentusersnumber(data){
    return new Promise((resolve,reject) =>
        get(getcurrentusersnumberPath, null, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function setstockpriceintervaltime(data){
    return new Promise((resolve,reject) =>
        post(setstockpriceintervaltimePath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function validgroupuser(data){
    return new Promise((resolve,reject) =>
        post(validgroupuserPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function resendcode(data){
    return new Promise((resolve,reject) =>
        post(resendcodePath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function activeverify(data){
    return new Promise((resolve,reject) =>
        post(activeverifyPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function savecontacts(data){
    return new Promise((resolve,reject) =>
        post(savecontactsPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function deleteuser(data){
    return new Promise((resolve,reject) =>
        post(deleteuserPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function admingetuserlist(){
    return new Promise((resolve,reject) =>
        get(admingetuserlistPath, null, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function resetpassword(data){
    return new Promise((resolve,reject) =>
        post(resetpasswordPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function gettoken(data){
    return new Promise((resolve,reject) =>
        post(gettokenPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function setactive(data){
    return new Promise((resolve,reject) =>
        post(setactivePath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function signup(data){
    return new Promise((resolve,reject) =>
        post(signupPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function validwatchlist(data){
    return new Promise((resolve,reject) =>
        post(validwatchlistPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getuserdata(data){
    return new Promise((resolve,reject) =>
        post(getuserdataPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function updateprofile(data){
    return new Promise((resolve,reject) =>
        post(updateprofilePath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function signin(data){
    return new Promise((resolve,reject) =>
        post(signinPath, data, false).then((resp) => {
            resolve(resp);
       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getsymbol(data){
    return new Promise((resolve,reject) =>
        post(getsymbolPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getsector(data){
    return new Promise((resolve,reject) =>
        post(getsectorPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getcurrentstockprice(data){
    return new Promise((resolve,reject) =>
        post(getcurrentstockpricePath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function saveWatchlist(data){
    return new Promise((resolve,reject) =>
        post(savewatchlistPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function updateWatchlist(data){
    return new Promise((resolve,reject) =>
        post(updatewatchlistPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function deleteWatchlist(data){
    return new Promise((resolve,reject) =>
        post(deletewatchlistPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getWatchlist(data){
    return new Promise((resolve,reject) =>
        post(getwatchlistPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}
export function changeViewStatus(data){
    return new Promise((resolve,reject) =>
        post(changeviewstatusPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getglobalWatchlist(){
    return new Promise((resolve,reject) =>
        get(getglobalwatchlistPath, null,false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function searchglobalfollowers(data){
    return new Promise((resolve,reject) =>
        post(searchglobalfollowersPath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function savewatchlisttemplate(data){
    return new Promise((resolve,reject) =>
        post(savewatchlisttemplatePath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getwatchlisttemplate(data){
    return new Promise((resolve,reject) =>
        post(getwatchlisttemplatePath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function updatewatchlisttemplate(data){
    return new Promise((resolve,reject) =>
        post(updatewatchlisttemplatePath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function savesharewatchlisttemplate(data){
    return new Promise((resolve,reject) =>
        post(savesharewatchlisttemplatePath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getsharewatchlisttemplate(data){
    return new Promise((resolve,reject) =>
        post(getsharewatchlisttemplatePath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function updatesharewatchlisttemplate(data){
    return new Promise((resolve,reject) =>
        post(updatesharewatchlisttemplatePath, data, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getearningstocks(){
    return new Promise((resolve,reject) =>
        get(getearningstocksPath,null, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function gettopstocks(){
    return new Promise((resolve,reject) =>
        get(gettopstocksPath, null, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getshortlong(){
    return new Promise((resolve,reject) =>
        get(getshortlongPath,null, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function gettopstocksforshortlong(){
    return new Promise((resolve,reject) =>
        get(gettopstocksforshortlongPath,null, false).then((resp) => {
            resolve(resp);        
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getfollowerslist(data){
    return new Promise((resolve,reject) =>
        post(getfollowerslistPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getfollowedlist(data){
    return new Promise((resolve,reject) =>
        post(getfollowedlistPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function deletefollower(data){
    return new Promise((resolve,reject) =>
        post(deletefollowerPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getglobalfollowerslist(){
    return new Promise((resolve,reject) =>
        get(getglobalfollowerslistPath, null, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function setfollowers(data){
    return new Promise((resolve,reject) =>
        post(setfollowersPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getfollowers(data){
    return new Promise((resolve,reject) =>
        post(getfollowersPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getcontacts(data){
    return new Promise((resolve,reject) =>
        post(getcontactsPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function importchat(data){
    return new Promise((resolve,reject) =>
        post(importchatPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function deletechat(data){
    return new Promise((resolve,reject) =>
        post(deletechatPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getchat(data){
    return new Promise((resolve,reject) =>
        post(getchatPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}
export function readchat(data){
    return new Promise((resolve,reject) =>
        post(readchatPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}
export function getchatfornotification(data){
    return new Promise((resolve,reject) =>
        post(getchatfornotificationPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function setcontacts(data){
    return new Promise((resolve,reject) =>
        post(setcontactsPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getowncontacts(data){
    return new Promise((resolve,reject) =>
        post(getowncontactsPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function getsharemethod(data){
    return new Promise((resolve,reject) =>
        post(getsharemethodPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function setsharemethod(data){
    return new Promise((resolve,reject) =>
        post(setsharemethodPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}

export function deleteuserincontact(data){
    return new Promise((resolve,reject) =>
        post(deleteuserincontactPath, data, false).then((resp) => {
            resolve(resp);       
        }).catch(err => {
            reject(err); // not provide internal server error
        })
    );
}
