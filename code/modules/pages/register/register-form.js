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

    function encryptROT13(message) {
        
        var result = "";
        for (var i = 0; i < message.length; i++) {

            var character = message[i];
            if (/[A-Z]/.test(character)) {var newCharacter = String.fromCharCode(((character.charCodeAt() - 65 + 13) % 26) + 65);
            } else if (/[a-z]/.test(character)) {var newCharacter = String.fromCharCode(((character.charCodeAt() - 97 + 13) % 26) + 97);
            } else {var newCharacter = character;}
    
            result += newCharacter;
        }
        return result.replace(/\\a/g, '').replace(/['"]+/g, '');
    }    

    var username = document.getElementById('input-username');
    var password1 = document.getElementById('input-password-1');
    var password2 = document.getElementById('input-password-2');
    var register_btn = document.getElementById('rfa-btn')
    var text_error_password = document.getElementById('password-error');
    
    function validateForm() {

        if (username.value.trim() === '') {return { isValid: false, message: 'The username field cannot be blank.' };}
        if (password1.value.trim() === '') {return { isValid: false, message: 'The password field cannot be blank.' };}
        if (password1.value === username.value) {return { isValid: false, message: 'The password cannot be the same as the username.' };}
        if (password1.value !== password2.value) {return { isValid: false, message: 'The passwords do not match.' };}
        var passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[\W_])(?!.*\s).{8,30}$/;
        if (!passwordRegex.test(password1.value)) {return { isValid: false, message: 'The password does not meet the requirements. It must be at least 8 characters long, contain one uppercase letter, one number, one lowercase letter, one special character, and no whitespace.' };}
      
        return { isValid: true };
    }

    register_btn.addEventListener('click', function() {

        var validationResult = validateForm();
    
        if (validationResult.isValid) {
            text_error_password.innerText = '';
            register_btn.disabled = true;
            register_btn.innerHTML = "Registering New User...";

            var fetchPort = parseInt(window.location.port) + 1;

            var data = {
                user: encryptROT13(username.value),
                pswd: encryptROT13(password1.value)
            };

            username.disabled = true;
            password1.disabled = true;
            password2.disabled = true;

            fetch('http://localhost:' + fetchPort + '/register_username', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            .then(response => {return response.json();})
            .then(response => {
                
                var data = JSON.parse(response);
                var success = decryptROT13(data.success)

                if (success === "True") {window.location.href = '../login/?u=' + username.value
                } else if (success === "False") {
                    document.getElementById('password-error').innerHTML = decryptROT13(data.error);
                    register_btn.disabled = false;username.disabled = false;password1.disabled = false;password2.disabled = false;
                    register_btn.innerHTML = "Register";
                } else {window.alert("Unknow Error.");window.location.reload()}

              })
              .catch(error => {console.error('Error calling Python script:', error);});
        } else {text_error_password.innerText = validationResult.message;register_btn.disabled = true;}
    })    
}
  
document.addEventListener('DOMContentLoaded', onPageLoad);
  