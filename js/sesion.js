function getUsernameFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('username');
}
  
var username = getUsernameFromURL();
console.log(username)

if (!username) {
    window.location.href = 'http://localhost/vkm/templates/login.html';
}

if (username) {
    document.getElementById("username").innerText = username;
}