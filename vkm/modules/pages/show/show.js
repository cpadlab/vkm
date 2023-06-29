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


function bad_request(){window.location.href = '../vault/?success=False&error=Bad%20Request'}

function set_header(header) {

    const styleSheet = Array.from(document.styleSheets).find((sheet) => sheet.href.includes('/show/show.css'));
    const cssRules = styleSheet.cssRules;

    for (const rule of cssRules) {

        if (rule.selectorText === '#shw-title::after') {
            const newContent = "'" + header + "'";
            const newRule = `content: ${newContent};`;
            
            styleSheet.insertRule(`#shw-title::after { ${newRule} }`, cssRules.length);
            break;
        }
    }
}

var mes_alert = document.getElementById('mes-alert');

function hide_alert() {mes_alert.style.opacity = '0'; mes_alert.style.transform = 'translate(-500%)';}

function see_alert(text) {
    document.getElementById('mes-alert-p').innerHTML = text;mes_alert.style.opacity = '1'; 
    mes_alert.style.transform = 'translate(0%)';setTimeout(hide_alert, 3000)
}

var key_vis = document.getElementById("ck-form-items")

var key_title =  document.getElementById("ck-title")
var input_cktitle = document.getElementById("input-cktitle")
var input_ckurl = document.getElementById("input-ckurl")
var input_ckuser = document.getElementById("input-ckuser")
var input_ckpassword = document.getElementById("input-ckpassword")
var selectElement = document.getElementById("ckselec-s");

var no_e_key = document.getElementById("edit-k-error");

var ck_title2 = document.getElementById("ck-title-2");
ck_title2.addEventListener('click', function() {navigator.clipboard.writeText(input_cktitle.value);see_alert("Site copied on Clipboard")})

var ck_url = document.getElementById("ck-url");
ck_url.addEventListener('click', function() {navigator.clipboard.writeText(input_ckurl.value);see_alert("URL copied on Clipboard")})

var ck_cpu = document.getElementById("ck-cpu");
ck_cpu.addEventListener('click', function() {navigator.clipboard.writeText(input_ckuser.value);see_alert("Username copied on Clipboard")})

var ck_cpk = document.getElementById("ck-cpk");
ck_cpk.addEventListener('click', function() {navigator.clipboard.writeText(input_ckpassword.value);see_alert("Password copied on Clipboard")})

var create_key_btn = document.getElementById("create-key-btn");
create_key_btn.addEventListener('click', function() {window.location.href = '../edit/?edit=True&type=key&code=' + params.get("name");})

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

var inputPassword1 = document.getElementById('input-ckpassword');
var seePasswordBtn = document.getElementById('see-password-btn');
var noSeePasswordBtn = document.getElementById('no-see-password-btn');

seePasswordBtn.addEventListener('click', function() {seePasswordBtn.style.display = 'none';noSeePasswordBtn.style.display = 'inline';inputPassword1.type = 'text';});
noSeePasswordBtn.addEventListener('click', function() {seePasswordBtn.style.display = 'inline';noSeePasswordBtn.style.display = 'none';inputPassword1.type = 'password';});


function key_fields(code) {

    set_header("Key")

    var PasswordCookie = atob(decryptROT13(getCookie("Password")));
    var UsernameCookie = atob(decryptROT13(getCookie("Username")));

    var fetchPort = parseInt(window.location.port) + 1;


    var data4 = {
        user: encryptROT13(UsernameCookie),
        pswd: encryptROT13(PasswordCookie),
        code: code.toString()
    };

    fetch('http://localhost:' + fetchPort + '/find_entry', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data4)})
    .then(response => {return response.json();})
    .then(response => {
            
            var data = JSON.parse(response);
            var success = decryptROT13(data.success)

            if (success === "True") {

            exi = decryptROT13(data.exists);

            if (exi === "True") {

                key_vis.style.display = 'inline';
                var DataKey = data.key;

                key_title.innerHTML = decryptROT13(DataKey[0]);

                input_cktitle.value = decryptROT13(DataKey[0]);
                input_ckurl.value = decryptROT13(DataKey[1]);
                input_ckuser.value = decryptROT13(DataKey[2]);
                input_ckpassword.value = decryptROT13(DataKey[3]);

                var optionElement = document.createElement("option");
                optionElement.value = decryptROT13(DataKey[4]).replace("Group: ", "").replace(/"/g, "");
                optionElement.text = decryptROT13(DataKey[4]).replace("Group: ", "").replace(/"/g, "");
                    
                selectElement.appendChild(optionElement);
                selectElement.disabled = true;
                selectElement.value = optionElement

                for (let i = 0; i < selectElement.options.length; i++) {selectElement.options[i].selected = false;}
                optionElement.selected = true;

                document.getElementById('show-title').innerHTML = "Show Key: " + decryptROT13(DataKey[0]) + " - VKM";

            } else {no_e_key.style.display = 'inline';}
        }
    })
    .catch(error => {console.error('Error calling Python script:', error);});
}

function show_key() {key_fields(params.get("name"));}
function see_group_noex() {document.getElementById("edit-g-error").style.display = 'inline-block'}

function exists_grp_show_keys() {

    var PasswordCookie = atob(decryptROT13(getCookie("Password")));
    var UsernameCookie = atob(decryptROT13(getCookie("Username")));

    var fetchPort = parseInt(window.location.port) + 1;

    var data = {
        user: encryptROT13(UsernameCookie),
        pswd: encryptROT13(PasswordCookie),
        groupname: encryptROT13(params.get("name"))
    };

    fetch('http://localhost:' + fetchPort + '/get_group_entry', {
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

                var DataKey = JSON.parse(data.keys.replace(/'/g, '"'))
                for (var i = 0; i < DataKey.length; i++) {show_row_keys(DataKey[i])}
                
            } else {document.getElementById('edit-gk-error').style.display = 'inline'}

        } else {window.alert("Unknow Error.");window.location.reload()}
    })
    .catch(error => {console.error('Error calling Python script:', error);});
}

function show_gr() {

    set_header("Group")

    document.getElementById('show-title').innerHTML = "Group: " + params.get("name") + " - VKM";

    var PasswordCookie = atob(decryptROT13(getCookie("Password")));
    var UsernameCookie = atob(decryptROT13(getCookie("Username")));

    var fetchPort = parseInt(window.location.port) + 1;

    var data = {
        user: encryptROT13(UsernameCookie),
        pswd: encryptROT13(PasswordCookie),
        groupname: encryptROT13(params.get("name").toString())
    };

    fetch('http://localhost:' + fetchPort + '/check_group_exists', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(response => {return response.json();})
    .then(response => {

        var data = JSON.parse(response);
        var success = decryptROT13(data.success)

        if (success === "True") {

            var exists = decryptROT13(data.exists)

            if (exists === "True") {exists_grp_show_keys()
            } else {see_group_noex()}

        }else {bad_request()}
    })
    .catch(error => {console.error('Error calling Python script:', error);});
   
}

if (params.get("type")) {
    if (params.get("type") === "group") {
        if (params.get("name")) {show_gr()
        } else {bad_request()}
    } else if (params.get("type") === "key") {
        if (params.get("name")) {show_key()
        } else {bad_request()}
    } else {bad_request()}   
} else {bad_request()}
