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

const params = new URLSearchParams(location.search);
var mes_alert = document.getElementById('mes-alert');
var mes_error_alert = document.getElementById('mes-alert2');

function hide_alert() {mes_alert.style.opacity = '0'; mes_alert.style.transform = 'translate(-500%)';}

function see_alert(text) {
    document.getElementById('mes-alert-p').innerHTML = text;mes_alert.style.opacity = '1'; 
    mes_alert.style.transform = 'translate(0%)';setTimeout(hide_alert, 3000)
}

function hide_error() {mes_error_alert.style.opacity = '0'; mes_error_alert.style.transform = 'translate(-500%)';}

function see_error(text) {
    document.getElementById('mes-alert-p2').innerHTML = text;mes_error_alert.style.opacity = '1'; 
    mes_error_alert.style.transform = 'translate(0%)';setTimeout(hide_error, 3000)
}

var bye_msaleret = document.getElementById('bye-msaleret');
bye_msaleret.addEventListener('click', function(event) {event.preventDefault();hide_alert();})

var bye_msaleret2 = document.getElementById('bye-msaleret2');
bye_msaleret2.addEventListener('click', function(event) {event.preventDefault();hide_error()})

if (params.get("success") === "True") {if (params.get("message")) {see_alert(params.get("message").toString())}}
if (params.get("success") === "False") {if (params.get("error")) {see_error(params.get("error").toString())}}
