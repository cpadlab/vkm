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
    
    const params = new URLSearchParams(location.search);

    var PasswordCookie = atob(decryptROT13(getCookie("Password")));
    var UsernameCookie = atob(decryptROT13(getCookie("Username")));

    var fetchPort = parseInt(window.location.port) + 1;

    var data = {
        user: encryptROT13(UsernameCookie),
        pswd: encryptROT13(PasswordCookie),
        search: encryptROT13(params.get("search")),
    };

    function set_page_title(item) {document.getElementById('search-title').innerHTML = 'Search ' + item + ' - VKM'}
    function bad_request(){window.location.href = '../vault/?success=False&error=Bad%20Request'}

    function show_row_keys(key) {
    
        var parentDiv = document.createElement("div");
        parentDiv.className = "content-db-row";
        parentDiv.addEventListener('click', function(event) {
            window.location.href = '../show/?type=key&name=' + key[4];
        });
    
        var iconKey = document.createElement("i");
        iconKey.id = "iconKey";
        iconKey.className = "fa-solid fa-key";
        parentDiv.appendChild(iconKey);
    
        var userTitle = document.createElement("span");
        userTitle.id = "user-title";
        userTitle.className = "cdbr-title";
        userTitle.textContent = key[0];
        parentDiv.appendChild(userTitle);
    
        var userUser = document.createElement("span");
        userUser.id = "user-user";
        userUser.className = "cdbr-user";
        userUser.textContent = ' ' + key[2];
        parentDiv.appendChild(userUser);
    
        var userEdit = document.createElement("button");
        userEdit.id = "user-edit";
        userEdit.className = "cdbr-edit";
        var editIcon = document.createElement("i");
        editIcon.className = "fa-solid fa-pen";
        userEdit.appendChild(editIcon);
        parentDiv.appendChild(userEdit);
        userEdit.addEventListener('click', function(event) {
            window.location.href = '../edit/?edit=True&type=key&code=' + key[4];
            event.stopPropagation();
        })
    
        var userGo = document.createElement("button");
        userGo.id = "user-go";
        userGo.className = "cdbr-edit";
        var goIcon = document.createElement("i");
        goIcon.className = "fa-solid fa-arrow-up-right-from-square";
        userGo.appendChild(goIcon);
        parentDiv.appendChild(userGo);
        userGo.addEventListener('click', function(event) {
            navigator.clipboard.writeText(key[1]);
            see_alert("Link copied on Clipboard")
            event.stopPropagation();
        })
    
        var userCpu = document.createElement("button");
        userCpu.id = "user-cpu";
        userCpu.className = "cdbr-edit";
        var cpuIcon = document.createElement("i");
        cpuIcon.className = "fa-solid fa-user";
        userCpu.appendChild(cpuIcon);
        parentDiv.appendChild(userCpu);
        userCpu.addEventListener('click', function(event) {
            navigator.clipboard.writeText(key[2]);
            see_alert("Username copied on Clipboard")
            event.stopPropagation();
        })
    
        var userCpk = document.createElement("button");
        userCpk.id = "user-cpk";
        userCpk.className = "cdbr-edit";
        var cpkIcon = document.createElement("i");
        cpkIcon.className = "fa-solid fa-key";
        userCpk.appendChild(cpkIcon);
        parentDiv.appendChild(userCpk);
        userCpk.addEventListener('click', function(event) {
            navigator.clipboard.writeText(key[3]);
            see_alert("Password copied on Clipboard")
            event.stopPropagation();
        })
    
        var dbContent = document.getElementById("db-content");
        dbContent.appendChild(parentDiv);
    }
    

    function show_rows(search) {

        fetch('http://localhost:' + fetchPort + '/search', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
            })
        .then(response => {return response.json();})
        .then(response => {

            var data = JSON.parse(response);
            var success = decryptROT13(data.success)

            if (success === "True") {

                if (decryptROT13(data.empty) === "False") {

                    var DataKey = JSON.parse(data.keys.replace(/'/g, '"'));
                    for (var i = 0; i < DataKey.length; i++) {show_row_keys(DataKey[i])}
                
                } else {
                    document.getElementById('edit-gk-error').style.display = 'inline'
                }

            }else {bad_request()}
        })
        .catch(error => {console.error('Error calling Python script:', error);});
    }

    if (params.get("search")) {set_page_title(params.get("search"));show_rows(params.get("search"));
    } else {bad_request()}

}

document.addEventListener('DOMContentLoaded', onPageLoad);