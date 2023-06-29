function onPageLoad() {

    var fetchPort = parseInt(window.location.port) + 1;

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

    var UsernameCookie = atob(decryptROT13(getCookie("Username")));
    var PasswordCookie = atob(decryptROT13(getCookie("Password")));

    document.getElementById('register-g').addEventListener('click', function(event) {event.preventDefault();window.location.href = '../create/?create=True&type=group'})
    document.getElementById('register-k').addEventListener('click', function(event) {event.preventDefault();window.location.href = '../create/?create=True&type=key'})
    
    document.getElementById('go-vault-btn').addEventListener('click', function(event) {event.preventDefault();window.location.href = '../vault/'})

    var data = {
        user: encryptROT13(UsernameCookie),
        pswd: encryptROT13(PasswordCookie)
    };

    fetch('http://localhost:' + fetchPort + '/total_keys', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        })
    .then(response => {return response.json();})
    .then(response => {

        var data = JSON.parse(response);
        var success = decryptROT13(data.success)

        if (success === "True") {document.getElementById('key-count').innerHTML = data.total + " Keys";
        } else {window.alert("Unknow Error.");window.location.reload()}
        
    })
    .catch(error => {console.error('Error calling Python script:', error);});
        
    var CookieTimeRemaining = getCookie("DateTime");
    var targetDate = new Date(CookieTimeRemaining);
    
    function updateSessionExpires() {

        var currentDate = new Date();

        var timeDiff = targetDate.getTime() - currentDate.getTime();
        var minutes = Math.abs((Math.floor(timeDiff / (1000 * 60) +1 )));
        var formattedMinutes = minutes.toString().padStart(2, '0');
        var seconds = Math.abs(Math.floor((timeDiff / 1000) % 60));
        var formattedSeconds = seconds.toString().padStart(2, '0');
        
        document.getElementById('session-expires-span').innerHTML = "Sesion - " + formattedMinutes + ":" + formattedSeconds;
    }

    setInterval(updateSessionExpires, 1000);

    var angledown = document.getElementById('menu-btn-down');
    var angleup = document.getElementById('menu-btn-up');
    var angle_menu = document.getElementById('block-items');
    var bi_sep_dbc = document.getElementById('bi-br-dbc');

    angledown.addEventListener('click', function() {
        angledown.style.display = 'none';angleup.style.display = 'inline';
        angle_menu.style.display = 'block';bi_sep_dbc.style.display = 'none'
    });

    angleup.addEventListener('click', function() {
        angledown.style.display = 'inline';angleup.style.display = 'none';
        bi_sep_dbc.style.display = 'block';angle_menu.style.display = 'none';
    });

    function logout(){

        var u = UsernameCookie
        var cookies = document.cookie.split(";");

        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var equalIndex = cookie.indexOf("=");
            var cookieName = equalIndex > -1 ? cookie.substr(0, equalIndex) : cookie;
            document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
        }

        window.location.href = '../login/?u=' + u
    }

    var logout_btn = document.getElementById('log-out-btn')
    logout_btn.addEventListener('click', function(event) {event.preventDefault();logout()})
}

document.addEventListener('DOMContentLoaded', onPageLoad);