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
    var text_error = document.getElementById('password-error');

    function validateForm() {
        
        if (username.value.trim() === '') {return { isValid: false, message: 'The username field cannot be blank.' };}
        if (password1.value.trim() === '') {return { isValid: false, message: 'The password field cannot be blank.' };}
        if (password1.value === username.value) {return { isValid: false, message: 'The password cannot be the same as the username.' };}
        if (password1.value !== password2.value) {return { isValid: false, message: 'The passwords do not match.' };}
        var passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[\W_])(?!.*\s).{8,30}$/;
        if (!passwordRegex.test(password1.value)) {return { isValid: false, message: 'The password does not meet the requirements. It must be at least 8 characters long, contain one uppercase letter, one number, one lowercase letter, one special character, and no whitespace.' };}
    
        return { isValid: true };
    }

    function common_checks() {
        
        var validationResult = validateForm();
    
        if (validationResult.isValid) {text_error.innerText = '';document.getElementById('rfa-btn').disabled = false;
        } else {text_error.innerText = validationResult.message;document.getElementById('rfa-btn').disabled = true;}

    }

    password1.addEventListener('input', function() {common_checks()});
    password2.addEventListener('input', function() {common_checks()});
    username.addEventListener('input', function() {common_checks()});

}
  
document.addEventListener('DOMContentLoaded', onPageLoad);
  