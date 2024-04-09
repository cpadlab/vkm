/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.1
  \_/|_\_\_|_|_|

VKM v6.1
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { requestPost, faFuncs } from '../../requests.js';
import { hostError } from '../../host.js';
import { generatePassword } from '../../other/generate.js';

function togglePasswordVisibility() {

    var passwordInput = document.getElementById("ckdform-input-password");
    var togglePasswordButton = document.getElementById("togglePasswordVisibility");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordButton.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        passwordInput.type = "password";
        togglePasswordButton.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }
}

document.getElementById('togglePasswordVisibility').addEventListener('click', togglePasswordVisibility);

var dataList = document.getElementById("groups-list");
var select = document.getElementById("ckd-group-select");
var options = dataList.querySelectorAll("option");

options.forEach(function(option) {

    if (option.getAttribute("value") === 'All') {return}
    else if (option.getAttribute("value") === 'Favorites') {return}

    var optionValue = option.getAttribute("value");
    var newOption = document.createElement("option");

    newOption.textContent = optionValue;
    select.appendChild(newOption);

    select.selectedIndex = -1;
});

const siteNameInput = document.getElementById('ckdform-input-name');
const siteLinkInput = document.getElementById('ckdform-input-link');
const usernameInput = document.getElementById('ckdform-input-username');
const passwordInput = document.getElementById('ckdform-input-password');
const groupSelect = document.getElementById('ckd-group-select');
const createButton = document.getElementById('createkey-btn');
const siteFavorite = document.getElementById('ckd-favorites-input');

const inputs = [siteNameInput, siteLinkInput, usernameInput, passwordInput, groupSelect];

function validateInputs() {

    let isValid = true;
    inputs.forEach(input => {
        if (input !== siteLinkInput && input.value.trim() === '') {isValid = false;}
    });

    if (groupSelect.value === '') {isValid = false;}

    createButton.disabled = !isValid;
}

inputs.forEach(input => {input.addEventListener('input', validateInputs);});
groupSelect.addEventListener('change', validateInputs);

createButton.addEventListener('click', async function(event) {
    event.preventDefault();

    siteNameInput.disabled = true;siteLinkInput.disabled = true;
    usernameInput.disabled = true;passwordInput.disabled = true;
    groupSelect.disabled = true;createButton.disabled = true;
    siteFavorite.disabled = true;

    const jsondata = {
        name: siteNameInput.value,
        link: siteLinkInput.value,
        username: usernameInput.value,
        password: passwordInput.value,
        group: groupSelect.value,
        favorite: siteFavorite.checked,
    };

    var result = JSON.parse(await requestPost(jsondata, faFuncs['addKey']));
    if (result.success === true) {window.location.reload();
    } else {hostError(result.error)}

});


document.getElementById('ckd-generate-btn').addEventListener('click', function(event) {
    passwordInput.value = generatePassword();
});