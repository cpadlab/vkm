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

    function set_page_title(item) {document.getElementById('edit-title').innerHTML = 'Edit ' + item + ' - VKM'}

    function set_title_after(item) {

        const styleSheet = Array.from(document.styleSheets).find((sheet) => sheet.href.includes('/edit/edit.css'));
        const cssRules = styleSheet.cssRules;

        for (const rule of cssRules) {
            if (rule.selectorText === '#edit-title2::after') {
                const newContent = "'" + item + "'";
                const newRule = `content: ${newContent};`;
                
                styleSheet.insertRule(`#edit-title2::after { ${newRule} }`, cssRules.length);
                break;
            }
        }
    }

    var input_group = document.getElementById("input-group")
    var edit_group_btn = document.getElementById("edit-group-btn")
    var cancel_group_btn = document.getElementById("cancel-group-btn")

    cancel_group_btn.addEventListener('click', function() {window.location.href = '../vault/'})
    function see_group_noex() {document.getElementById("edit-g-error").style.display = 'inline-block'}

    function create_group_form(name){
        set_title_after(name);set_page_title("Group " + name);input_group.value = name;
        document.getElementById('edit-group-form-items').style.display = 'inline-block';
    }

    input_group.addEventListener('input', function() {

        if (input_group.value === params.get("name")) {edit_group_btn.innerHTML = 'No Changed';edit_group_btn.disabled = true;
        } else if (input_group.value.trim() === "") {edit_group_btn.innerHTML = 'No Input';edit_group_btn.disabled = true;
        } else {edit_group_btn.innerHTML = 'Edit Group';edit_group_btn.disabled = false;}

    })
    
    var PasswordCookie = atob(decryptROT13(getCookie("Password")));
    var UsernameCookie = atob(decryptROT13(getCookie("Username")));

    var fetchPort = parseInt(window.location.port) + 1;

    try {
        var data = {
            user: encryptROT13(UsernameCookie),
            pswd: encryptROT13(PasswordCookie),
            groupname: encryptROT13(params.get("name")),
        };
    } catch(error) {
        var data = {
            user: encryptROT13(UsernameCookie),
            pswd: encryptROT13(PasswordCookie),
            code: encryptROT13(params.get("code")),
        };
    }

    function bad_request(){window.location.href = '../vault/?success=False&error=Bad%20Request'}

    var delete_div = document.getElementById("delete-group")
    var delete_btn = document.getElementById("delete-group-btn")
    var code_delete_input = document.getElementById("code-delete-input")
    var delete_true_btn = document.getElementById("delete-fin-group-btn")
    var code_p = document.getElementById("code-p")
    var code = ''

    delete_btn.addEventListener('click', function() {

        delete_div.style.display = 'inline-block';

        var data = {
            lengh: "12",
            types: "4.25"
        };

        fetch('http://localhost:' + fetchPort + '/generate_password2', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)})
        .then(response => response.text())
        .then(result => {
            code_p.innerText = 'Code: ' + decryptROT13(result).replace(/\\a/g, '').replace(/['"]+/g, '');
            code = decryptROT13(result).replace(/\\a/g, '').replace(/['"]+/g, '');})
        .catch(error => {console.error('Error calling Python script:', error);});
    })

    code_delete_input.addEventListener('input', function() {

        if (code === code_delete_input.value) {delete_true_btn.disabled = false;delete_true_btn.innerHTML = 'Delete'
        } else {delete_true_btn.disabled = true;delete_true_btn.innerHTML = 'Write Code'}

    })

    delete_true_btn.addEventListener('click', function() {

        fetch('http://localhost:' + fetchPort + '/delete_group', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)})
        .then(response => response.text())
        .then(result => {window.location.href = '../vault/?success=True&message=' + data.groupname + '%20Group%20Eliminated%20Correctly.'})
        .catch(error => {console.error('Error calling Python script:', error);});
    })

    var delete_group_cancel_btn = document.getElementById("delete-group-cancel-btn")
    delete_group_cancel_btn.addEventListener('click', function() {delete_div.style.display = 'none';delete_true_btn.disabled = true;code_delete_input.value = ''})

    var key_title =  document.getElementById("ck-title")
    var input_cktitle = document.getElementById("input-cktitle")
    var input_ckurl = document.getElementById("input-ckurl")
    var input_ckuser = document.getElementById("input-ckuser")
    var input_ckpassword = document.getElementById("input-ckpassword")
    var selectElement = document.getElementById("ckselec-s");

    var cktitle = "";
    var ckurl = "";
    var ckuser = "";
    var ckpassword = "";
    var selectGroup = "";

    function check_key_inputs() {

        if (input_ckpassword.value === '' || input_ckuser.value === '' || input_ckurl.value === '' || input_cktitle.value === '') {return null;
        } else if (
            input_ckpassword.value !== ckpassword ||
            input_ckuser.value !== ckuser ||
            input_ckurl.value !== ckurl ||
            input_cktitle.value !== cktitle
        ) {return true;
        } else {return false;}
          
    }

    var edit_key_btn = document.getElementById("edit-key-btn");

    edit_key_btn.addEventListener('click', function() {

        var data6 = {
            user: encryptROT13(UsernameCookie),
            pswd: encryptROT13(PasswordCookie),
            inputTitle: encryptROT13(input_cktitle.value),
            inputURL: encryptROT13(input_ckurl.value),
            inputUsername: encryptROT13(input_ckuser.value),
            inputPassword: encryptROT13(input_ckpassword.value),
            selectGroup: encryptROT13(selectElement.value),
            code: params.get("code").toString()
        };
    
        fetch('http://localhost:' + fetchPort + '/edit_key', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data6)
        })
        .then(response => {return response.json();})
        .then(response => {window.location.href = '../vault/?success=True&message=' + cktitle + '%20Key%20Edited%20Correctly.'})
        .catch(error => {console.error('Error calling Python script:', error);});
    })

    function change_btn_key_edit() {

        var check = check_key_inputs()

        if (check === true) {
            edit_key_btn.disabled = false;
            edit_key_btn.innerHTML = 'Save';
        } else if (check === null) {
            edit_key_btn.disabled = true;
            edit_key_btn.innerHTML = 'No Input';
        } else {
            edit_key_btn.disabled = true;
            edit_key_btn.innerHTML = 'No Changed';
        }
    }

    var delete_finito_i = document.getElementById('delete-finito-i');

    input_cktitle.addEventListener('input', function() {change_btn_key_edit()})
    input_ckurl.addEventListener('input', function() {change_btn_key_edit()})
    input_ckuser.addEventListener('input', function() {change_btn_key_edit()})
    input_ckpassword.addEventListener('input', function() {change_btn_key_edit()})

    var seePasswordBtn = document.getElementById('see-password-btn');
    var noSeePasswordBtn = document.getElementById('no-see-password-btn');

    var delete_key_btn = document.getElementById('delete-key-btn');
    var delete_finito = document.getElementById('delete-finito');
    var ydelete_key_btn = document.getElementById('ydelete-key-btn');
    delete_key_btn.addEventListener('click', function() {
        delete_finito.style.display = 'inline';
    })

    var cancel_rm_key = document.getElementById('cancel-rm-key');
    cancel_rm_key.addEventListener('click', function() {
        delete_finito.style.display = 'none';
        delete_finito_i.value = ""
    })

    function check_delete_finito_i(){
        if (delete_finito_i.value === cktitle) {
            ydelete_key_btn.disabled = false
        } else {
            ydelete_key_btn.disabled = true
        }
    }

    ydelete_key_btn.addEventListener('click', function() {

        var data5 = {
            user: encryptROT13(UsernameCookie),
            pswd: encryptROT13(PasswordCookie),
            code: params.get("code").toString()
        };
    
        fetch('http://localhost:' + fetchPort + '/delete_key', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data5)
        })
        .then(response => {return response.json();})
        .then(response => {window.location.href = '../vault/?success=True&message=' + cktitle + '%20Key%20Eliminated%20Correctly.'})
        .catch(error => {console.error('Error calling Python script:', error);});
    })

    delete_finito_i.addEventListener('input', function() {check_delete_finito_i()})

    seePasswordBtn.addEventListener('click', function() {seePasswordBtn.style.display = 'none';noSeePasswordBtn.style.display = 'inline';input_ckpassword.type = 'text';});    
    noSeePasswordBtn.addEventListener('click', function() {seePasswordBtn.style.display = 'inline';noSeePasswordBtn.style.display = 'none';input_ckpassword.type = 'password';});

    function check_key_e(code) {

        set_title_after("Key");
        document.getElementById('ck-form-items').style.display = 'inline-block';
    
        var PasswordCookie = atob(decryptROT13(getCookie("Password")));
        var UsernameCookie = atob(decryptROT13(getCookie("Username")));
    
        var fetchPort = parseInt(window.location.port) + 1;

        var data5 = {
            user: encryptROT13(UsernameCookie),
            pswd: encryptROT13(PasswordCookie)
        };
    
        fetch('http://localhost:' + fetchPort + '/get_groups', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data5)
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
    
    
        var data = {
            user: encryptROT13(UsernameCookie),
            pswd: encryptROT13(PasswordCookie),
            code: code.toString()
        };
    
        fetch('http://localhost:' + fetchPort + '/find_entry', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)})
        .then(response => {return response.json();})
        .then(response => {
                
                var data = JSON.parse(response);
                var success = decryptROT13(data.success)
    
                if (success === "True") {
    
                exi = decryptROT13(data.exists);
    
                if (exi === "True") {
    
                    var DataKey = data.key;

                    set_page_title("Key " + decryptROT13(DataKey[0]))
    
                    key_title.innerHTML = decryptROT13(DataKey[0]);
    
                    input_cktitle.value = decryptROT13(DataKey[0]);
                    cktitle =  decryptROT13(DataKey[0]);

                    input_ckurl.value = decryptROT13(DataKey[1]);
                    ckurl =  decryptROT13(DataKey[1]);

                    input_ckuser.value = decryptROT13(DataKey[2]);
                    ckuser =  decryptROT13(DataKey[2]);

                    input_ckpassword.value = decryptROT13(DataKey[3]);
                    ckpassword =  decryptROT13(DataKey[3]);
    
                    var optionElement = decryptROT13(DataKey[4]).replace("Group: ", "").replace(/"/g, "");
                    selectGroup = optionElement

                    for (let i = 0; i < selectElement.options.length; i++) {
                        selectElement.options[i].selected = false;
                        if (selectElement.options[i].value === optionElement) {
                            selectElement.options[i].selected = true;
                        }
                    }
    
                    document.getElementById('edit-title').innerHTML = "Edit Key: " + decryptROT13(DataKey[0]) + " - VKM";
    
                } else {no_e_key.style.display = 'inline';}
            }
        })
        .catch(error => {console.error('Error calling Python script:', error);});
    }

    function check_group_e() {

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

                if (exists === "True") {create_group_form(params.get("name"))
                } else {see_group_noex()}

            }else {bad_request()}
        })
        .catch(error => {console.error('Error calling Python script:', error);});
    }

    edit_group_btn.addEventListener('click', function() {

        edit_group_btn.disabled = true

        var data2 = {
            user: encryptROT13(UsernameCookie),
            pswd: encryptROT13(PasswordCookie),
            groupname: encryptROT13(params.get("name")),
            newname: encryptROT13(input_group.value),
        };

        fetch('http://localhost:' + fetchPort + '/rename_group', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data2)
        })
        .then(response => {return response.json();})
        .then(response => {
            var data = JSON.parse(response);
            var success = decryptROT13(data.success)

            if (success === "True") {window.location.href = '../vault/?success=True&message=' + data2.groupname + '%20Group%20Renamed%20Correctly%20to' + data2.newname
            } else {window.alert("Unknow Error.");window.location.reload()}
            
        })
        .catch(error => {console.error('Error calling Python script:', error);});
    })

    if (params.get("edit") === "True") {
        if (params.get("type")) {
            if (params.get("type") === "group") {check_group_e()
                if (params.get("name")) {
                } else {bad_request()}
            } else if (params.get("type") === "key") {
                if (params.get("code")) {check_key_e(params.get("code"))
                } else {bad_request()}
            } else {bad_request()}   
        } else {bad_request()}
    } else {bad_request()}
}

document.addEventListener('DOMContentLoaded', onPageLoad);