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

var LoggedInCookie = getCookie("LoggedIn")
var PasswordCookie = getCookie("Password")
var UsernameCookie = getCookie("Username")

if (LoggedInCookie !== "") {

    var LoggedIn = decryptROT13(LoggedInCookie);
    var LCisValid = /^[A-Za-z0-9+/=]+$/.test(LoggedIn);

    if (LCisValid) {
        if (PasswordCookie) {if (!UsernameCookie) {window.location.href = '../login/'}
        } else {window.location.href = '../login/'}
    } else {window.location.href = '../login/'}
    
} else {window.location.href = '../login/'}

