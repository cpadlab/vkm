fetch("../php/log.out.php", {
    method: "POST",
})
.then(response => {
    location.href = "login.html";
})