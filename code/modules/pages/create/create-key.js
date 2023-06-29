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

    var mes_alert = document.getElementById('mes-alert');

    function hide_alert() {mes_alert.style.opacity = '0'; mes_alert.style.transform = 'translate(-500%)';}

    function see_alert(text) {
        document.getElementById('mes-alert-p').innerHTML = text;mes_alert.style.opacity = '1'; 
        mes_alert.style.transform = 'translate(0%)';setTimeout(hide_alert, 3000)
    }

    var bye_msaleret = document.getElementById('bye-msaleret');
    bye_msaleret.addEventListener('click', function(event) {event.preventDefault();hide_alert();})

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

    var PasswordCookie = atob(decryptROT13(getCookie("Password")));
    var UsernameCookie = atob(decryptROT13(getCookie("Username")));

    var fetchPort = parseInt(window.location.port) + 1;

    var data = {
        user: encryptROT13(UsernameCookie),
        pswd: encryptROT13(PasswordCookie)
    };

    fetch('http://localhost:' + fetchPort + '/get_groups', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
    })
    .then(response => {return response.json();})
    .then(response => {
        
        var data = JSON.parse(response);
        var success = decryptROT13(data.success)

        if (success === "True") {

            var select = document.getElementById("ckselec-s");
            var groupsArray = JSON.parse(Object.values(data.groups)[0].replace(/'/g, '"'));

            for (var i = 0; i < groupsArray.length; i++) {
                if (decryptROT13(groupsArray[i]) === "Recycle Bin") {
                } else {
                    var option = document.createElement("option");option.text = decryptROT13(groupsArray[i]);
                    option.value = decryptROT13(groupsArray[i]);select.add(option);
                }
            }

        } else {window.alert("Unknow Error.");window.location.reload()}
    })
    .catch(error => {console.error('Error calling Python script:', error);});

    var gen_pass = document.getElementById('generate-password-btn');
    gen_pass.addEventListener('click', function() {
    
        fetch('http://localhost:' + fetchPort + '/generate_password')
        .then(response => response.text())
        .then(result => {document.getElementById('input-ckpassword').value = decryptROT13(result).replace(/\\a/g, '').replace(/['"]+/g, '');})
        .catch(error => {console.error('Error calling Python script:', error);});

        see_alert("Password Generated")
    });

    var gen_uss = document.getElementById('generate-username-btn');
    gen_uss.addEventListener('click', function() {
    
        fetch('http://localhost:' + fetchPort + '/choose_username')
        .then(response => response.text())
        .then(result => {document.getElementById('input-ckuser').value = decryptROT13(result).replace(/\\a/g, '').replace(/['"]+/g, '').toLowerCase();})
        .catch(error => {console.error('Error calling Python script:', error);});
            
        see_alert("Username Generated")

    });
    
    var inputPassword1 = document.getElementById('input-ckpassword');
    var seePasswordBtn = document.getElementById('see-password-btn');
    var noSeePasswordBtn = document.getElementById('no-see-password-btn');

    noSeePasswordBtn.addEventListener('click', function() {seePasswordBtn.style.display = 'inline';noSeePasswordBtn.style.display = 'none';inputPassword1.type = 'password';});
    seePasswordBtn.addEventListener('click', function() {seePasswordBtn.style.display = 'none';noSeePasswordBtn.style.display = 'inline';inputPassword1.type = 'text';});

    var ck_cpk = document.getElementById('ck-cpk');
    var ck_cpu = document.getElementById('ck-cpu');
    var inputUser = document.getElementById("input-ckuser")

    ck_cpk.addEventListener('click', function() {navigator.clipboard.writeText(inputPassword1.value);see_alert("Password Copied to Clipboard")})
    ck_cpu.addEventListener('click', function() {navigator.clipboard.writeText(inputUser.value);see_alert("Username Copied to Clipboard")})
    
    var inputTitle = document.getElementById('input-cktitle');
    var ckError = document.getElementById('ck-error');
    var ckBTN = document.getElementById('create-key-btn');
    
    function check_cg_input() {

        if (inputTitle.value.trim() === '') {ckError.innerHTML =  'The Title field cannot be blank.';ckBTN.disabled = true;
        } else {ckError.innerHTML = '';ckBTN.disabled = false;}
    }
    
    setInterval(check_cg_input, 100);

    ckBTN.addEventListener('click', function() {

        see_alert("Adding Key to Vault")

        var inputTitle = document.getElementById("input-cktitle").value.trim();;
        var inputURL = document.getElementById("input-ckurl").value.trim() || "None";;
        var inputUsername = document.getElementById("input-ckuser").value.trim() || "None";;
        var inputPassword = document.getElementById("input-ckpassword").value.trim() || "None";;
        var selectGroup = document.getElementById("ckselec-s").value;

        var RKdata = {
            user: encryptROT13(UsernameCookie),
            pswd: encryptROT13(PasswordCookie),
            inputTitle: encryptROT13(inputTitle),
            inputURL: encryptROT13(inputURL),
            inputUsername: encryptROT13(inputUsername),
            inputPassword: encryptROT13(inputPassword),
            selectGroup: encryptROT13(selectGroup),
        };

        fetch('http://localhost:' + fetchPort + '/register_key', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(RKdata)
        })
        .then(response => {return response.json();})
        .then(response => {

            var data = JSON.parse(response);
            var success = decryptROT13(data.success)

            if (success === "True") {window.location.href = '../vault/?success=True&message=' + inputTitle + '%20Key%20Registed%20Correctly'
            } else {window.location.href = '../vault/?success=False&error=' + inputTitle + "%20don't%20registed. " + decryptROT13(data.error)}

        })
        .catch(error => {console.error('Error calling Python script:', error);});
    })
    
}

document.addEventListener('DOMContentLoaded', onPageLoad);