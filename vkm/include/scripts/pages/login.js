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
import { hostError } from '../host.js';
import { createCookie } from '../cookies.js';
import { getCurrentDateTimeString } from '../other/clock.js';
import { updatePageURL, updateParamURL, getParameterValue } from '../url.js';


function changeToRegister() {updatePageURL('register');window.location.reload()}

export function togglePasswordVisibility() {

    var passwordInput = document.getElementById("passwordInput");
    var togglePasswordButton = document.getElementById("togglePasswordVisibility");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        passwordInput.type = "password";
        togglePasswordButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
}

async function loginUsername() {

    document.getElementById("mlf-submit").disabled = true;
    document.getElementById("togglePasswordVisibility").disabled = true;
    document.getElementById("mlf-goReg").hidden = true;

    var username = document.getElementById("usernameInput");
    var password = document.getElementById("passwordInput");
    username.disabled = true;password.disabled = true;

    const jsondata = {
        username: username.value,
        password: password.value
    };

    updateParamURL('u', username.value)
    var result = JSON.parse(await requestPost(jsondata, faFuncs['checkCredentials']));

    console.log(result)

    if (result.success === true) {
        createCookie('session', result.cookie);updatePageURL('vault');
        updateParamURL('n', 'Successful login.');
        createCookie('time', getCurrentDateTimeString());window.location.reload();
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

        $("#login-error").empty();
        $("#mlf-submit").prop("disabled", true);

        if (username === "" || password === "") {$("#login-error").append("<i class='fa-solid fa-xmark'></i> No field can be blank<br>").addClass('text-incorrect');}
        if (password === username) {$("#login-error").append("<i class='fa-solid fa-xmark'></i> The password cannot be the same as the user name.<br>").addClass('text-incorrect');}

        if (!verifyComplexity(password)) {
            if (!/(?=.*[a-z])/.test(password)) {$("#login-error").append("<i class='fa-solid fa-xmark'></i> The password must have at least one lowercase letter<br>").addClass('text-incorrect');}
            if (!/(?=.*[A-Z])/.test(password)) {$("#login-error").append("<i class='fa-solid fa-xmark'></i> The password must have at least one capital letter<br>").addClass('text-incorrect');}
            if (!/(?=.*\d)/.test(password)) {$("#login-error").append("<i class='fa-solid fa-xmark'></i> The password must have at least one number<br>").addClass('text-incorrect');}
            if (!/(?=.*[\W_])/.test(password)) {$("#login-error").append("<i class='fa-solid fa-xmark'></i> The password must have at least one special character (@$!%*?&)<br>").addClass('text-incorrect');}
            if (password.length < 8 || password.length > 30) {$("#login-error").append("<i class='fa-solid fa-xmark'></i> The password must be between 8 and 30 characters long<br>").addClass('text-incorrect');}
        }

        if ($("#login-error").is(':empty')) {
            $("#login-error").append("<i class='fa-solid fa-check'></i> All requirements are met").removeClass('text-incorrect').addClass('text-correct');
            $("#mlf-submit").prop("disabled", false);
        }
    });
}

passwordCheck();

var tmpUsername = getParameterValue('u')
if (tmpUsername != null) {document.getElementById("usernameInput").value = tmpUsername;}

document.getElementById('togglePasswordVisibility').addEventListener('click', togglePasswordVisibility);
document.getElementById('mlf-submit').addEventListener('click', loginUsername);
document.getElementById('mlf-goReg').addEventListener('click', changeToRegister);
