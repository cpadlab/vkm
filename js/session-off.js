fetch("../php/check.sesion.php", {method: "POST",})
.then(response => {return response.json();})
.then(response => {if (response.login  === true) {} else {
    location.href = "login.html";}})