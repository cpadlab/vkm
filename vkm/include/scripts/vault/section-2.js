/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.0
  \_/|_\_\_|_|_|

VKM v6.0
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { requestGet, faFuncs } from '../requests.js';
import { getCookie } from '../cookies.js';
import { logout } from './navbar.js';

var totalkeys = JSON.parse(await requestGet(faFuncs['getTotalKey']));
if (totalkeys.success) {document.getElementById("totalkeys-btn").innerHTML = totalkeys.total + ' Keys <i class="fa-solid fa-lock"></i>';
} else {document.getElementById("totalkeys-btn").innerHTML = 'Unknown Keys <i class="fa-solid fa-lock"></i>';}

function hostCreateGroup() {$('.host-popups').load('vkm/include/content/vault/create-group.html');}
function hostCreateKey() {$('.host-popups').load('vkm/include/content/vault/create-key.html');}

document.getElementById('creategroup-btn').addEventListener('click', hostCreateGroup);
document.getElementById('createkey-btn').addEventListener('click', hostCreateKey);

function formatTwoDigits(number) {
    return number < 10 ? "0" + number : number;
}

function timeRemainingCookie() {
    
    var cookieValue = getCookie("time");
    if (cookieValue) {
        
        var dateCreation = new Date(cookieValue);
        var dateCurrent = new Date();
        var timeElapsed = dateCurrent.getTime() - dateCreation.getTime();
        var timeRemaining= (15 * 60 * 1000) - timeElapsed;
        
        if (timeRemaining> 0) {
            
            var minutes = Math.floor(timeRemaining/ (60 * 1000));
            var seconds = Math.floor((timeRemaining% (60 * 1000)) / 1000);
            var formatMinutes = formatTwoDigits(minutes);
            var formatSeconds = formatTwoDigits(seconds);
            return `${formatMinutes}:${formatSeconds} <i class="fa-regular fa-clock"></i>`;

        } else {logout();return '00:00 <i class="fa-regular fa-clock"></i>';}
    } else {logout();return '<i class="fa-solid fa-triangle-exclamation"></i> Unknow Error';}
}

function updateTimeRestant() {
    
    var timeleftBtn = document.getElementById("timeleft-btn");
    
    if (timeleftBtn) {
        setInterval(function() {
            var timeRemaining= timeRemainingCookie();
            timeleftBtn.innerHTML = timeRemaining;
        }, 1000);
    }
}

updateTimeRestant();
