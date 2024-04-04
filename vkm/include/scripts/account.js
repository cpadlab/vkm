/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.0
  \_/|_\_\_|_|_|

VKM v6.0
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { updateParamURL, deleteParamURL } from './url.js';
import { requestPost, requestGet, faFuncs } from './requests.js';
import { hostError } from './host.js';
import { fileExport } from './conf.js';
import { getCookie } from './cookies.js';

function togglePasswordVisibility() {

    var passwordInput = document.getElementById("aca-password-input");
    var togglePasswordButton = document.getElementById("togglePasswordVisibility");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        passwordInput.type = "password";
        togglePasswordButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
}

function logout() {
    $('.alerts').load('vkm/include/content/pop-up/log-out.html', function() {});
}

var username = JSON.parse(await requestGet(faFuncs['getUsername']));
if (username.success === true) {document.getElementById("acb-span").innerHTML = username.nickname.charAt(0).toUpperCase() + username.nickname.slice(1) + '!';
} else {document.getElementById("acb-span").innerHTML = 'User!';}

var current_password = JSON.parse(await requestGet(faFuncs['getPassword']));

function checkChangeUsername() {
    if (document.getElementById('aca-username-input').value.toLowerCase() == username.nickname) {document.getElementById('aca-username-confirm').disabled = true;}
    else if (document.getElementById('aca-username-input').value.toLowerCase() == "") {document.getElementById('aca-username-confirm').disabled = true;}
    else {document.getElementById('aca-username-confirm').disabled = false;}
}
document.getElementById('aca-username-input').addEventListener('input', checkChangeUsername);

async function changeUsernameAction() {
    var jsondata = {username: document.getElementById('aca-username-input').value}
    var result = JSON.parse(await requestPost(jsondata, faFuncs['modifyUsername']));
    if (result.success) {
        updateParamURL('u', document.getElementById('aca-username-input').value);
        updateParamURL('n', 'Username Updated');logout()
    } else {hostError(result.error)};
}
document.getElementById('aca-username-confirm').addEventListener('click', changeUsernameAction);

document.getElementById('togglePasswordVisibility').addEventListener('click', togglePasswordVisibility);

function verifyComplexity(password) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
    return regex.test(password);
}

function checkChangePassword() {

    var current_username = username.nickname
    var password = $("#aca-password-input").val();

    $("#login-error").empty();
    $("#mlf-submit").prop("disabled", true);

    if (password === "") {$("#login-error").append("<i class='fa-solid fa-xmark'></i> No field can be blank<br>").addClass('text-incorrect');}
    if (password === current_password.password) {$("#login-error").append("<i class='fa-solid fa-xmark'></i> The password cannot be the same as the previous one<br>").addClass('text-incorrect');}
    if (password === current_username) {$("#login-error").append("<i class='fa-solid fa-xmark'></i> The password cannot be the same as the user name.<br>").addClass('text-incorrect');}

    if (!verifyComplexity(password)) {
        if (!/(?=.*[a-z])/.test(password)) {$("#login-error").append("<i class='fa-solid fa-xmark'></i> The password must have at least one lowercase letter<br>").addClass('text-incorrect');}
        if (!/(?=.*[A-Z])/.test(password)) {$("#login-error").append("<i class='fa-solid fa-xmark'></i> The password must have at least one capital letter<br>").addClass('text-incorrect');}
        if (!/(?=.*\d)/.test(password)) {$("#login-error").append("<i class='fa-solid fa-xmark'></i> The password must have at least one number<br>").addClass('text-incorrect');}
        if (!/(?=.*[\W_])/.test(password)) {$("#login-error").append("<i class='fa-solid fa-xmark'></i> The password must have at least one special character (@$!%*?&)<br>").addClass('text-incorrect');}
        if (password.length < 8 || password.length > 30) {$("#login-error").append("<i class='fa-solid fa-xmark'></i> The password must be between 8 and 30 characters long<br>").addClass('text-incorrect');}
    }

    if ($("#login-error").is(':empty')) {
        $("#login-error").append("<i class='fa-solid fa-check'></i> All requirements are met").removeClass('text-incorrect').addClass('text-correct');
        $("#aca-password-confirm").prop("disabled", false);
    } else {
        $("#aca-password-confirm").prop("disabled", true);
    }
}
document.getElementById('aca-password-input').addEventListener('input', checkChangePassword);

async function changePasswordAction() {
    var jsondata = {password: document.getElementById('aca-password-input').value}
    var result = JSON.parse(await requestPost(jsondata, faFuncs['modifyPassword']));
    if (result.success) {updateParamURL('n', 'Password Updated');logout()
    } else {hostError(result.error)};
}
document.getElementById('aca-password-confirm').addEventListener('click', changePasswordAction);

document.getElementById("aca-username-action").addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById("aca-username-hidden").style.opacity = '1'
    document.getElementById("aca-username-hidden").style.pointerEvents = 'all'
});

document.getElementById("aca-password-action").addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById("aca-password-hidden").style.opacity = '1'
    document.getElementById("aca-password-hidden").style.pointerEvents = 'all'
});

document.getElementById("aca-password-cancel").addEventListener('click', function(event) {
    event.preventDefault();

    $("#aca-password-confirm").prop("disabled", true);
    $("#login-error").empty();
    $("#aca-password-input").val("");

    document.getElementById("aca-password-hidden").style.opacity = '0'
    document.getElementById("aca-password-hidden").style.pointerEvents = 'none'
});

document.getElementById("aca-username-cancel").addEventListener('click', function(event) {
    event.preventDefault();
    $("#aca-username-input").val("");
    document.getElementById("aca-username-hidden").style.opacity = '0'
    document.getElementById("aca-username-hidden").style.pointerEvents = 'none'
});

document.getElementById("return-vault-btn").addEventListener('click', function(event) {
    event.preventDefault();
    updateParamURL('p', 'vault');window.location.reload()
});

document.getElementById("aca-delete-cancel").addEventListener('click', function(event) {
    event.preventDefault();
    $("#aca-delete-input").val("");
    document.getElementById("aca-delete-hidden").style.opacity = '0'
    document.getElementById("aca-delete-text").style.display = 'none';
    document.getElementById("aca-delete-hidden").style.pointerEvents = 'none'
});

document.getElementById("aca-delete-action").addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById("aca-delete-text").style.display = 'block';
    document.getElementById("aca-delete-hidden").style.opacity = '1';
    document.getElementById("aca-delete-hidden").style.pointerEvents = 'all'
});

function checkDeletePassword() {
    if (document.getElementById('aca-delete-input').value === username.nickname) {document.getElementById('aca-delete-confirm').disabled = false;
    } else {document.getElementById('aca-delete-confirm').disabled = true;}
}
document.getElementById('aca-delete-input').addEventListener('input', checkDeletePassword);

document.getElementById("aca-delete-confirm").addEventListener('click', async function(event) {
    event.preventDefault();
    var result = JSON.parse(await requestGet(faFuncs['deleteUsername']));
    if (result.success) {
        deleteParamURL('u');updateParamURL('n', 'Username Deleted');logout()
    } else {hostError(result.error)};
});

document.getElementById("aca-export-action").addEventListener('click', async function(event) {
    event.preventDefault();
    var result = JSON.parse(await requestGet(faFuncs['exportKeys']));
    if (result.success) {

        var tmpLink = document.createElement('a');      
        tmpLink.href = fileExport;
        tmpLink.target = '_blank';
        document.body.appendChild(tmpLink);
        tmpLink.click();tmpLink.remove();tmpLink = null;

    } else {hostError(result.error)};
});

document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'hidden') {$('.alerts').load('vkm/include/content/pop-up/auto-logout.html');}
});

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