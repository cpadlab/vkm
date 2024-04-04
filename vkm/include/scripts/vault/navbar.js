/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.0
  \_/|_\_\_|_|_|

VKM v6.0
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { getParameterValue, updateParamURL, deleteParamURL } from '../url.js';
import { requestGet, faFuncs } from '../requests.js';
import { deleteCookie } from '../cookies.js';
import { initializeGP } from '../generate.js';

var tmpUsername = getParameterValue('u')
if (tmpUsername != null) {document.getElementById("username-h1").innerHTML = tmpUsername.charAt(0).toUpperCase() + tmpUsername.slice(1);}
else {
    var username = JSON.parse(await requestGet(faFuncs['getUsername']));
    if (username.success === true) {document.getElementById("username-h1").innerHTML = username.nickname.charAt(0).toUpperCase() + username.nickname.slice(1);
    } else {document.getElementById("username-h1").innerHTML = 'User';}
}

export function logout() {$('.alerts').load('vkm/include/content/pop-up/log-out.html', function() {});}
document.getElementById('nav-logout-btn').addEventListener('click', logout);

function generateHost() {$('.host-popups').load('vkm/include/content/pop-up/generate-password.html', function() {initializeGP()})}
document.getElementById('nav-generate-btn').addEventListener('click', generateHost);

function hostAccount() {updateParamURL('p', 'account');deleteParamURL('s');window.location.reload()}
document.getElementById('nav-account-btn').addEventListener('click', hostAccount);