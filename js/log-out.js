fetch("../php/log-out.php", {
})
.then(response => {
    window.location.href = "http://localhost/vkm/templates/login.html";
})