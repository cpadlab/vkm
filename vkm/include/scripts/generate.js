/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.0
  \_/|_\_\_|_|_|

VKM v6.0
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

import { createNotification } from './notification.js';

export function generatePassword(length=12, includeNumbers=true, includeSpecialChars=true, includeLetters=true) {
    const numbers = '0123456789';const specialChars = '!@#$%^&*()-_+=';
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let validChars = '';let password = '';

    if (includeNumbers) validChars += numbers;
    if (includeSpecialChars) validChars += specialChars;
    if (includeLetters) validChars += letters;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * validChars.length);
        password += validChars[randomIndex];
    }

    return password;
}

function updatePassword() {
    var rangeInput = document.getElementById("gp-lengh");
    var l = rangeInput.value;
    
    let p = generatePassword();
    if (document.getElementById("gp-char-easy").checked) {p = generatePassword(l, false, false, true)}
    if (document.getElementById("gp-char-medium").checked) {p = generatePassword(l, true, false, true)}
    if (document.getElementById("gp-char-hard").checked) {p = generatePassword(l, true, true, true)}

    document.getElementById('gp-input').value = p;
}

function copyPassword() {

    navigator.clipboard.writeText(document.getElementById('gp-input').value)
    createNotification('Copied password')
}

export function initializeGP() {
    document.getElementById('gp-input').value = generatePassword();
    document.getElementById('gp-input-regen').addEventListener('click', updatePassword);
    document.getElementById('gp-input').addEventListener('click', copyPassword);
}