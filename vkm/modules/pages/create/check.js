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

    function set_title_after(item) {

        const styleSheet = Array.from(document.styleSheets).find((sheet) => sheet.href.includes('/create/create.css'));
        const cssRules = styleSheet.cssRules;

        for (const rule of cssRules) {
            
            if (rule.selectorText === '#create-title::after') {
                const newContent = "'" + item + "'";
                const newRule = `content: ${newContent};`;
                
                styleSheet.insertRule(`#create-title::after { ${newRule} }`, cssRules.length);
                break;
            }
        }
    }

    function set_page_title(item) {document.getElementById('create-title').innerHTML = 'Create ' + item + ' - VKM'}

    function create_key_form(){set_title_after("Key");set_page_title("Key");document.getElementById('ck-form-items').style.display = 'inline-block';}
    function create_group_form(){set_title_after("Group");set_page_title("Group");document.getElementById('cg-form-items').style.display = 'inline-block';}
    function bad_request(){window.location.href = '../vault/?success=False&error=Bad%20Request'}

    const params = new URLSearchParams(location.search);

    if (params.get("create") === "True") {
        if (params.get("type")) {
            if (params.get("type") === "key") {create_key_form()}
            else if (params.get("type") === "group") {create_group_form()}
            else {bad_request()}
        } else {bad_request()}
    } else {bad_request()}

    var inputGroupName = document.getElementById('input-group');
    var cgError = document.getElementById('cg-error');
    var cgBTN = document.getElementById('create-group-btn');

    function check_cg_input() {
        if (inputGroupName.value.trim() === '') {cgError.innerHTML =  'The Group name field cannot be blank.';cgBTN.disabled = true;
        } else {cgError.innerHTML = '';cgBTN.disabled = false;}
    }

    setInterval(check_cg_input, 100);

    var PasswordCookie = atob(decryptROT13(getCookie("Password")));
    var UsernameCookie = atob(decryptROT13(getCookie("Username")));

    var fetchPort = parseInt(window.location.port) + 1;
    
    cgBTN.addEventListener('click', function() {

        var data = {
            user: encryptROT13(UsernameCookie),
            pswd: encryptROT13(PasswordCookie),
            groupname: encryptROT13(inputGroupName.value)
        };

        console.log("Data", data)

        fetch('http://localhost:' + fetchPort + '/register_group', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(response => {return response.json();})
        .then(response => {
            
            var data = JSON.parse(response);
            var success = decryptROT13(data.success)

            if (success === "True") {window.location.href = '../vault/?success=True&message=' + inputGroupName.value + '%20Group%20Created%20Correctly'
            } else {window.alert("Unknow Error.");window.location.reload()}
            
        })
        .catch(error => {console.error('Error calling Python script:', error);});
    });

}
  
document.addEventListener('DOMContentLoaded', onPageLoad);
  