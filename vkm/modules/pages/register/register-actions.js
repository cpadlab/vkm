/*
# ██╗    ██╗██╗   ██╗ █████╗ ██╗     
# ██║    ██║██║   ██║██╔══██╗██║     
# ██║ █╗ ██║██║   ██║███████║██║     
# ██║███╗██║██║   ██║██╔══██║██║     
# ╚███╔███╔╝╚██████╔╝██║  ██║███████╗
#  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝
#          (code by wual)

# VKM V5.0.6 | 2023 Summer Review 1
# Page >> https://14wual.github.io/vkm
# Code >> https://github.com/14wual/VKM
# Follow me >> https://twitter.com/14wual
*/

function onPageLoad() {

    var username = document.getElementById('input-username');
    var password1 = document.getElementById('input-password-1');
    var password2 = document.getElementById('input-password-2');

    var seePasswordBtn = document.getElementById('see-password-btn');
    var noSeePasswordBtn = document.getElementById('no-see-password-btn');
    var seePasswordBtn2 = document.getElementById('see-password-btn-2');
    var noSeePasswordBtn2 = document.getElementById('no-see-password-btn-2');

    var text_error = document.getElementById('password-error');

    var generateUsernameBtn = document.getElementById('generate-username-btn');
    var inputUsername = document.getElementById('input-username');

    var generatePasswordBtn = document.getElementById('generate-password-btn');
    var generatePasswordBtn2 = document.getElementById('generate-password-btn-2');
    var inputPassword1 = document.getElementById('input-password-1');
    var inputPassword2 = document.getElementById('input-password-2');

    function validateForm() {

        if (username.value.trim() === '') {return { isValid: false, message: 'The username field cannot be blank.' };}
        if (password1.value.trim() === '') {return { isValid: false, message: 'The password field cannot be blank.' };}
        if (password1.value === username.value) {return { isValid: false, message: 'The password cannot be the same as the username.' };}
        if (password1.value !== password2.value) {return { isValid: false, message: 'The passwords do not match.' };}
        var passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[\W_])(?!.*\s).{8,30}$/;
        if (!passwordRegex.test(password1.value)) {return { isValid: false, message: 'The password does not meet the requirements. It must be at least 8 characters long, contain one uppercase letter, one number, one lowercase letter, one special character, and no whitespace.' };}
    
        return { isValid: true };
    }

    function fields_checks() {
        
        var validationResult = validateForm();
    
        if (validationResult.isValid) {text_error.innerText = '';document.getElementById('rfa-btn').disabled = false;
        } else {text_error.innerText = validationResult.message;document.getElementById('rfa-btn').disabled = true;}
    }


    function decryptROT13(message) {

        var result = "";
    
        for (var i = 0; i < message.length; i++) {
    
            var character = message[i];
    
            if (/[A-Z]/.test(character)) {var newCharacter = String.fromCharCode(((character.charCodeAt() - 65 + 13) % 26) + 65);
            } else if (/[a-z]/.test(character)) {var newCharacter = String.fromCharCode(((character.charCodeAt() - 97 + 13) % 26) + 97);
            } else {var newCharacter = character;}
    
            result += newCharacter;
        }
        return result;
    } 
    
    generateUsernameBtn.addEventListener('click', function() {
        
        var fetchPort = parseInt(window.location.port) + 1;
    
        fetch('http://localhost:' + fetchPort + '/choose_username')
        .then(response => response.text())
        .then(result => {inputUsername.value = decryptROT13(result).replace(/\\a/g, '').replace(/['"]+/g, '').toLowerCase();})
        .catch(error => {console.error('Error calling Python script:', error);});
            
        fields_checks()
    });
    
    generatePasswordBtn.addEventListener('click', function() {
        
        var fetchPort = parseInt(window.location.port) + 1;
    
        fetch('http://localhost:' + fetchPort + '/generate_password')
        .then(response => response.text())
        .then(result => {
            inputPassword1.value = decryptROT13(result).replace(/\\a/g, '').replace(/['"]+/g, '');
            inputPassword2.value = decryptROT13(result).replace(/\\a/g, '').replace(/['"]+/g, '');})
        .catch(error => {console.error('Error calling Python script:', error);});

        fields_checks()
    });
    
    generatePasswordBtn2.addEventListener('click', function() {
        
        var fetchPort = parseInt(window.location.port) + 1;
    
        fetch('http://localhost:' + fetchPort + '/generate_password')
        .then(response => response.text())
        .then(result => {
            inputPassword1.value = decryptROT13(result).replace(/\\a/g, '').replace(/['"]+/g, '');
            inputPassword2.value = decryptROT13(result).replace(/\\a/g, '').replace(/['"]+/g, '');})
        .catch(error => {console.error('Error calling Python script:', error);});

        fields_checks()
    });
    
    seePasswordBtn.addEventListener('click', function() {
        seePasswordBtn.style.display = 'none';noSeePasswordBtn.style.display = 'inline';
        seePasswordBtn2.style.display = 'none';noSeePasswordBtn2.style.display = 'inline';
        inputPassword1.type = 'text';inputPassword2.type = 'text';
    });
    
    noSeePasswordBtn.addEventListener('click', function() {
        seePasswordBtn.style.display = 'inline';noSeePasswordBtn.style.display = 'none';
        seePasswordBtn2.style.display = 'inline';noSeePasswordBtn2.style.display = 'none';
        inputPassword1.type = 'password';inputPassword2.type = 'password';
    });
    
    seePasswordBtn2.addEventListener('click', function() {
        seePasswordBtn.style.display = 'none';noSeePasswordBtn.style.display = 'inline';
        seePasswordBtn2.style.display = 'none';noSeePasswordBtn2.style.display = 'inline';
        inputPassword1.type = 'text';inputPassword2.type = 'text';
    });
    
    noSeePasswordBtn2.addEventListener('click', function() {
        seePasswordBtn.style.display = 'inline';noSeePasswordBtn.style.display = 'none';
        seePasswordBtn2.style.display = 'inline';noSeePasswordBtn2.style.display = 'none';
        inputPassword1.type = 'password';inputPassword2.type = 'password';
    });

}
  
document.addEventListener('DOMContentLoaded', onPageLoad);
  