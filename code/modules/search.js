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

var searchMain = document.getElementById('search-main');
var searchI = document.getElementById('search-input');
var searchB = document.getElementById('search-btn');

function check_input(){if (searchI.value.trim() === "") {hide_input();return false;} else {return true}}
function hide_input() {searchMain.style.transform = 'translate(-50%, 500%)';searchMain.style.opacity = '0';}
function go_search() {if (check_input() === true) {window.location.href = '../search/?search=' + searchI.value}}
searchB.addEventListener('click', function(event) {go_search()})

document.addEventListener('keydown', function(event) {

    var tecla = event.key;
    
    var isInputActive = document.activeElement.tagName.toLowerCase() === 'input';
    
    if (!isInputActive) {
      
        if (/^[a-zA-Z0-9]$/.test(tecla)) {searchMain.style.transform = 'translate(-50%, 0%)';searchMain.style.opacity = '1';searchI.value += tecla;
        } else if (tecla === 'Enter') {go_search();
        } else if (tecla === 'Backspace') {searchI.value = searchI.value.substring(0, searchI.value.length - 1);}

    }
}); 

setInterval(check_input, 2000);