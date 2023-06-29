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

    function hide_alert() {mes_alert.style.opacity = '0'; mes_alert.style.transform = 'translate(-500%)';}

    function see_alert(text) {
        document.getElementById('mes-alert-p').innerHTML = text;mes_alert.style.opacity = '1'; 
        mes_alert.style.transform = 'translate(0%)';setTimeout(hide_alert, 3000)
    }

    function show_keys(key) {
    
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

    function show_groups(groupname) {

        var contentDbRow = document.createElement('div');
        contentDbRow.className = 'content-db-row';
        contentDbRow.addEventListener('click', function(event) {
            window.location.href = '../show/?type=group&name=' + groupname;
        });

        var iconFolder = document.createElement('i');
        iconFolder.className = 'fa-solid fa-folder';
        iconFolder.id = 'IconFolder'
        contentDbRow.appendChild(iconFolder);

        var groupTitle = document.createElement('span');
        groupTitle.id = 'group-title';
        groupTitle.className = 'cdbr-title';
        groupTitle.textContent = " " + groupname;

        var groupEdit = document.createElement('button');
        groupEdit.id = 'group-edit';
        groupEdit.className = 'cdbr-edit';

        var icon = document.createElement('i');
        icon.className = 'fa-solid fa-pen';
        groupEdit.appendChild(icon);
        icon.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = '../edit/?edit=True&type=group&name=' + groupname;
            event.stopPropagation();
        })

        contentDbRow.appendChild(groupTitle);
        contentDbRow.appendChild(groupEdit);
        
        var dbContent = document.getElementById('db-content');
        dbContent.appendChild(contentDbRow);

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
                
            var groupsArray = JSON.parse(Object.values(data.groups)[0].replace(/'/g, '"'));

            for (var i = 0; i < groupsArray.length; i++) {
                if (decryptROT13(groupsArray[i]) === "Recycle Bin") {
                } else {show_groups(decryptROT13(groupsArray[i]));}
            }

        } else {window.alert("Unknow Error.");window.location.reload()}
    })
    .catch(error => {console.error('Error calling Python script:', error);});

    fetch('http://localhost:' + fetchPort + '/get_keys', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(response => {return response.json();})
    .then(response => {
            
        var data = JSON.parse(response);
        var success = decryptROT13(data.success)

        if (success === "True") {

            var DataKey = JSON.parse(data.keys.replace(/'/g, '"'))
            for (var i = 0; i < DataKey.length; i++) {show_keys(DataKey[i])}

        } else {window.alert("Unknow Error.");window.location.reload()}
    })
    .catch(error => {console.error('Error calling Python script:', error);});

    const styleSheet = Array.from(document.styleSheets).find((sheet) => sheet.href.includes('/vault/vault.css'));
    const cssRules = styleSheet.cssRules;
        
    for (const rule of cssRules) {
        if (rule.selectorText === '#header-title::after') {
            const newContent = "'" + UsernameCookie + "'";
            const newRule = `content: ${newContent};`;
            
            styleSheet.insertRule(`#header-title::after { ${newRule} }`, cssRules.length);
            break;
        }
    }

    document.getElementById('vault-title').innerHTML = UsernameCookie + "'s Vault - VKM";
    
}

document.addEventListener('DOMContentLoaded', onPageLoad);