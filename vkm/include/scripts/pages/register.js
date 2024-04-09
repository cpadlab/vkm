/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.1
  \_/|_\_\_|_|_|

VKM v6.1
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { requestPost, faFuncs } from '../requests.js';
import { hostError, hostLogin, delRegister } from '../host.js';
import { updatePageURL, updateParamURL, getParameterValue } from '../url.js';

export function togglePasswordVisibility() {

    var passwordInput = document.getElementById("passwordInput");
    var repeatPasswordInput = document.getElementById("repeatPasswordInput");
    var togglePasswordButton = document.getElementById("togglePasswordVisibility");
    var toggleRepeatPasswordButton = document.getElementById("toggleRepeatPasswordVisibility");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        repeatPasswordInput.type = "text";
        togglePasswordButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        toggleRepeatPasswordButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        passwordInput.type = "password";
        repeatPasswordInput.type = "password";
        togglePasswordButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
        toggleRepeatPasswordButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
}

function changeToLogin() {updatePageURL('login');window.location.reload()}
function popupInfo() {$('.host-info').load('vkm/include/content/pop-up/register-info.html')}

async function registerUsername() {

    document.getElementById("mrf-info").disabled = true;
    document.getElementById("mrf-submit").disabled = true;
    document.getElementById("toggleRepeatPasswordVisibility").disabled = true;
    document.getElementById("togglePasswordVisibility").disabled = true;
    document.getElementById("repeatPasswordInput").disabled = true;
    document.getElementById("mlf-goLog").hidden = true;

    var username = document.getElementById("usernameInput");
    var password = document.getElementById("passwordInput");
    username.disabled = true;password.disabled = true;

    const jsondata = {
        username: username.value,
        password: password.value
    };

    updateParamURL('u', username.value)
    var result = JSON.parse(await requestPost(jsondata, faFuncs['registerUsername']));

    if (result.success === true) {
        $('.host-info').load('vkm/include/content/pop-up/register-ok.html')
        updatePageURL('login')
    } else {hostError(result.error)}

}

function verifyComplexity(password) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;
    return regex.test(password);
}

function passwordCheck() {

    $("input[type='text'], input[type='password']").on('input', function() {
        
        var username = $("#usernameInput").val();
        var password = $("#passwordInput").val();
        var repeatPassword = $("#repeatPasswordInput").val();

        $("#register-error").empty();
        $("#mrf-submit").prop("disabled", true);

        if (username === "" || password === "" || repeatPassword === "") {$("#register-error").append("<i class='fa-solid fa-xmark'></i> No field can be blank<br>").addClass('text-incorrect');}
        if (password !== repeatPassword) {$("#register-error").append("<i class='fa-solid fa-xmark'></i> Passwords do not match<br>").addClass('text-incorrect');}
        if (password === username) {$("#register-error").append("<i class='fa-solid fa-xmark'></i> The password cannot be the same as the user name.<br>").addClass('text-incorrect');}

        if (!verifyComplexity(password)) {
            if (!/(?=.*[a-z])/.test(password)) {$("#register-error").append("<i class='fa-solid fa-xmark'></i> The password must have at least one lowercase letter<br>").addClass('text-incorrect');}
            if (!/(?=.*[A-Z])/.test(password)) {$("#register-error").append("<i class='fa-solid fa-xmark'></i> The password must have at least one capital letter<br>").addClass('text-incorrect');}
            if (!/(?=.*\d)/.test(password)) {$("#register-error").append("<i class='fa-solid fa-xmark'></i> The password must have at least one number<br>").addClass('text-incorrect');}
            if (!/(?=.*[\W_])/.test(password)) {$("#register-error").append("<i class='fa-solid fa-xmark'></i> The password must have at least one special character (@$!%*?&)<br>").addClass('text-incorrect');}
            if (password.length < 8 || password.length > 30) {$("#register-error").append("<i class='fa-solid fa-xmark'></i> The password must be between 8 and 30 characters long<br>").addClass('text-incorrect');}
        }

        if ($("#register-error").is(':empty')) {
            $("#register-error").append("<i class='fa-solid fa-check'></i> All requirements are met").removeClass('text-incorrect').addClass('text-correct');
            $("#mrf-submit").prop("disabled", false);
        }
    });
}

passwordCheck();

var tmpUsername = getParameterValue('u')
if (tmpUsername != null) {document.getElementById("usernameInput").value = tmpUsername;}

document.getElementById('togglePasswordVisibility').addEventListener('click', togglePasswordVisibility);
document.getElementById('toggleRepeatPasswordVisibility').addEventListener('click', togglePasswordVisibility);
document.getElementById('mrf-info').addEventListener('click', popupInfo);
document.getElementById('mrf-submit').addEventListener('click', registerUsername);
document.getElementById('mlf-goLog').addEventListener('click', changeToLogin);
