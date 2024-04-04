/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.0
  \_/|_\_\_|_|_|

VKM v6.0
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

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


export function initializeViewKey(name, link, username, password) {

    document.getElementById("ckdform-input-name").value = name;

    document.getElementById("ckdform-input-link").value = link;
    document.getElementById("ckdform-input-username").value = username;
    document.getElementById("ckdform-input-password").value = password;

    document.getElementById("togglePasswordVisibility").addEventListener('click', togglePasswordVisibility);
}