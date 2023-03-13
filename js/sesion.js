function getUsernameFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('username');
}

function checkSession() {
    fetch("../php/sesion.php", {})
    .then(response => {
        return response.json();
    })
    .then(result => {
        if (result.success  === true) {
            console.log(result.success)
            document.getElementById('tittle').innerText = "Vault · " + result.user;
        }
        else {
            window.location.href = 'http://localhost/vkm/templates/login.html';
        }
    })
}
  
var access = checkSession();


