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

    const params = new URLSearchParams(location.search);

    var seePasswordBtn = document.getElementById('see-password-btn');
    var noSeePasswordBtn = document.getElementById('no-see-password-btn');
    var inputPassword1 = document.getElementById('input-password-1');
    var inputUsername = document.getElementById('input-username');
    
    var login_btn = document.getElementById('lfa-btn');
    var login_error = document.getElementById('login-error');

    seePasswordBtn.addEventListener('click', function() {seePasswordBtn.style.display = 'none';noSeePasswordBtn.style.display = 'inline';inputPassword1.type = 'text';});    
    noSeePasswordBtn.addEventListener('click', function() {seePasswordBtn.style.display = 'inline';noSeePasswordBtn.style.display = 'none';inputPassword1.type = 'password';});

    function check_fields() {
        if (inputUsername.value.trim() === '') {return { isValid: false, message: 'The username field cannot be blank.' };}
        if (inputPassword1.value.trim() === '') {return { isValid: false, message: 'The password field cannot be blank.' };}
        return { isValid: true}
    }

    function validate_form() {

        validationResult = check_fields()

        if (validationResult.isValid) {login_error.innerText = '';login_btn.disabled = false;
        } else {login_error.innerText = validationResult.message;login_btn.disabled = true;}

    }

    if (params.get("u")) {var username = params.get("u");inputUsername.value = username;}
    var password = ""

    inputPassword1.addEventListener('input', function() {password = inputPassword1.value;validate_form();});
    inputUsername.addEventListener('input', function() {username = inputUsername.value;validate_form();});

    function getCookie(name) {

        var cookieName = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(";");
      
        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) === " ") {cookie = cookie.substring(1);}
            if (cookie.indexOf(cookieName) === 0) {return cookie.substring(cookieName.length, cookie.length);}
        }
      
        return "";
    }

    function setCookie(name, value, expiration) {
        var expires = new Date();
        expires.setTime(expires.getTime() + expiration * 1000);
        document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString() + ';path=/';
    }

    function createCookies(username, password) {

        var cookieNameL = "LoggedIn";
        var cookieValueL = encryptROT13(btoa(String.fromCharCode.apply(null, crypto.getRandomValues(new Uint8Array(32)))));

        var cookieNameP = "Password";
        var cookieValueP = encryptROT13(btoa(password));

        var cookieNameU = "Username";
        var cookieValueU = encryptROT13(btoa(username));

        var cookieNameD = "DateTime";
        var currentDateD = new Date();
        var cookieValueD = currentDateD.toISOString();

        setCookie(cookieNameL, cookieValueL, 900)
        setCookie(cookieNameP, cookieValueP, 900)
        setCookie(cookieNameU, cookieValueU, 900)
        setCookie(cookieNameD, cookieValueD, 900)
    }

    login_btn.addEventListener('click', function() {

        var fetchPort = parseInt(window.location.port) + 1;

        var data = {
            user: encryptROT13(username),
            pswd: encryptROT13(password),
        };

        inputUsername.disabled = true;
        inputPassword1.disabled = true;
        login_btn.disabled = true;
        login_btn.innerHTML = "Checking Access...";

        fetch('http://localhost:' + fetchPort + '/check_login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => {return response.json();})
        .then(response => {
            
            var data = JSON.parse(response);
            var success = decryptROT13(data.success)

            if (success === "True") {

                createCookies(username, password)

                var LoggedInCookie = getCookie("LoggedIn")
                var PasswordCookie = getCookie("Password")
                var UsernameCookie = getCookie("Username")

                if (LoggedInCookie !== "") {
                    var LoggedIn = decryptROT13(LoggedInCookie);
                    var LCisValid = /^[A-Za-z0-9+/=]+$/.test(LoggedIn);
                    if (LCisValid) {
                        if (PasswordCookie) {
                            if (atob(decryptROT13(PasswordCookie)) === password) {
                                if (UsernameCookie) {
                                    if (atob(decryptROT13(UsernameCookie)) === username) {
                                        window.location.href = '../vault/'
                                    } else {window.alert("Internal Error.An unexpected error occurred");window.location.reload()}
                                } else {window.alert("Internal Error.An unexpected error occurred");window.location.reload()}
                            } else {window.alert("Internal Error.An unexpected error occurred");window.location.reload()}
                        } else {window.alert("Internal Error.An unexpected error occurred");window.location.reload()}
                    } else {window.alert("Internal Error.An unexpected error occurred");window.location.reload()}
                } else {window.alert("Internal Error.An unexpected error occurred");window.location.reload()}

            } else if (success === "False") {

                inputUsername.disabled = false;inputPassword1.disabled = false;
                login_btn.disabled = false;login_btn.innerHTML = "Login";
                login_error.innerHTML = decryptROT13(data.error);

            }else {window.alert("Unknow Error.");window.location.reload()}

        })
        .catch(error => {console.error('Error calling Python script:', error);});
    })

}
  
document.addEventListener('DOMContentLoaded', onPageLoad);
  