/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.1
  \_/|_\_\_|_|_|

VKM v6.1
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { tokenData, cookie_session, page } from './conf.js';
import { createCookie, deleteCookie } from './cookies.js';
import { requestGet, faFuncs } from './requests.js';
import { updatePageURL, getParameterValue, deleteParamURL } from './url.js';
import { hostRegister, hostLogin, hostVault, hostAccount } from './host.js';
import { createNotification } from './pop-up/notification.js';

function decodeURLString(urlString) {return decodeURIComponent(urlString.replace(/\+/g, ' '));}

createCookie('token', tokenData.token);
var n = getParameterValue('n')

if (n) {
    createNotification(decodeURLString(n))
    deleteParamURL('n')
}

if (page === 'login') {deleteCookie('session');updatePageURL('login');hostLogin();
} else if (page === 'register') {deleteCookie('session');updatePageURL('register');hostRegister();
} else {

    if (cookie_session !== null) {

        var check_cs = JSON.parse(await requestGet(faFuncs['checkCookie']));

        if (check_cs.success === false) {
            deleteCookie('session');updatePageURL('login');hostLogin();
            
        } else{
            if (page === 'account') {updatePageURL('account');hostAccount()}
            else {updatePageURL('vault');hostVault()}
            
        }
    
    } else {updatePageURL('login');hostLogin();}
}