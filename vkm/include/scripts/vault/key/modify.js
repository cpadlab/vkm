/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.1
  \_/|_\_\_|_|_|

VKM v6.1
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { faFuncs, requestPost } from '../../requests.js';

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

export async function initializeModKey(code) {

    const jsondata = {
        code: code,
    };

    var key = JSON.parse(await requestPost(jsondata, faFuncs['getKey']));

    const nameInput = document.getElementById("ckdform-input-name");
    const linkInput = document.getElementById("ckdform-input-link");
    const usernameInput = document.getElementById("ckdform-input-username");
    const passwordInput = document.getElementById("ckdform-input-password");
    const favoritesCheckbox = document.getElementById("ckd-favorites-input");

    const oldTitle = key.key[1];nameInput.value = oldTitle;
    const oldLink = key.key[2];linkInput.value = oldLink;
    const oldUsername = key.key[4];usernameInput.value = oldUsername;
    const oldPassword = key.key[3];passwordInput.value = oldPassword;
    const oldGroup = key.key[7];
    var oldFav = key.key[5] == 1 ? true : false;

    var dataList = document.getElementById("groups-list");
    const select = document.getElementById("ckd-group-select");
    var options = dataList.querySelectorAll("option");

    options.forEach(function(option) {

        if (option.getAttribute("value") === 'All') {return}
        else if (option.getAttribute("value") === 'Favorites') {return}

        var optionValue = option.getAttribute("value");
        var newOption = document.createElement("option");

        newOption.textContent = optionValue;
        newOption.value = optionValue;

        select.appendChild(newOption);
        select.selectedIndex = -1;

    });

    var optionToSelect = select.querySelector("option[value='" + oldGroup + "']");
    if (optionToSelect) {select.selectedIndex = Array.from(select.options).indexOf(optionToSelect);}

    if (oldFav === true) {favoritesCheckbox.checked = true;}
    else {favoritesCheckbox.checked = false;}

    document.getElementById("togglePasswordVisibility").addEventListener('click', togglePasswordVisibility);

    function modEvent() {

        var hasTitleChanged = document.getElementById("ckdform-input-name").value !== oldTitle;
        var hasLinkChanged = document.getElementById("ckdform-input-link").value !== oldLink;
        var hasUsernameChanged = document.getElementById("ckdform-input-username").value !== oldUsername;
        var hasPasswordChanged = document.getElementById("ckdform-input-password").value !== oldPassword;
        var hasGroupChanged = document.getElementById("ckd-group-select").value !== oldGroup;
        var hasFavChanged = document.getElementById("ckd-favorites-input").checked !== oldFav;

        if (hasTitleChanged || hasLinkChanged || hasUsernameChanged || hasPasswordChanged || hasGroupChanged || hasFavChanged) {
            document.getElementById("createkey-btn").disabled = false;
        } else {document.getElementById("createkey-btn").disabled = true;}
    }

    nameInput.addEventListener("input", modEvent);
    linkInput.addEventListener("input", modEvent);
    usernameInput.addEventListener("input", modEvent);
    passwordInput.addEventListener("input", modEvent);
    select.addEventListener("change", modEvent);
    favoritesCheckbox.addEventListener("change", modEvent);


    document.getElementById("createkey-btn").addEventListener('click', async function(event) {
        event.preventDefault();


        var newTitle = document.getElementById("ckdform-input-name").value !== oldTitle ? document.getElementById("ckdform-input-name").value : oldTitle;
        var newLink = document.getElementById("ckdform-input-link").value !== oldLink ? document.getElementById("ckdform-input-link").value : oldLink
        var newUsername = document.getElementById("ckdform-input-username").value !== oldUsername ? document.getElementById("ckdform-input-username").value : oldUsername
        var newPassword = document.getElementById("ckdform-input-password").value !== oldPassword ? document.getElementById("ckdform-input-password").value : oldPassword
        var newGroup = document.getElementById("ckd-group-select").value !== oldGroup ? document.getElementById("ckd-group-select").value : oldGroup
        var newFav = document.getElementById("ckd-favorites-input").checked !== oldFav ? document.getElementById("ckd-favorites-input").checked : oldFav

        const jsondata2 = {
            code: code, name:newTitle,
            link:newLink, username:newUsername,
            password:newPassword, group:newGroup,
            favorite:newFav
        };

        var result = JSON.parse(await requestPost(jsondata2, faFuncs['modifyKey']));

        if (result.success === true) {window.location.reload();
        } else {hostError(result.error)}
        
    });

}
