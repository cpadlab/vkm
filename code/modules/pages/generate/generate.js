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

    function gen_actions() {

        see_alert("Password generated.")
        
        var fetchPort = parseInt(window.location.port) + 1;

        var checkboxLetters = document.getElementById("checkbox-letters");
        var checkboxNumber = document.getElementById("checkbox-number");
        var checkboxSpecial = document.getElementById("checkbox-special");

        var char = 0
        if (checkboxLetters.checked) { char += 1 };
        if (checkboxNumber.checked) { char += 1.5 };
        if (checkboxSpecial.checked) { char += 1.75 };
        if (char === 0) { char = 1}

        var data = {
            lengh: document.getElementById('slider-length').value.toString(),
            types: char.toString()
        };

        fetch('http://localhost:' + fetchPort + '/generate_password2', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)})
        .then(response => response.text())
        .then(result => {
            gkf_span.innerText = decryptROT13(result).replace(/\\a/g, '').replace(/['"]+/g, '');
            gkf_span.value = decryptROT13(result).replace(/\\a/g, '').replace(/['"]+/g, '');})
        .catch(error => {console.error('Error calling Python script:', error);});
    }

    var gkf_span = document.getElementById('gkf-span');
    var re_gkf = document.getElementById('re-gkf');
    re_gkf.addEventListener('click', function() {gen_actions()});

    gen_actions()

    var cp_key_gen = document.getElementById('copy-gkf');
    cp_key_gen.addEventListener('click', function() {var copyText = gkf_span.value;navigator.clipboard.writeText(copyText);see_alert("Password copied on Clipboard")});

}
  
document.addEventListener('DOMContentLoaded', onPageLoad);
  