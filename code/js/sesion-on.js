fetch("php/check.sesion.php", {method: "POST",})
.then(response => {return response.json();})
.then(response => {if (response.login  === false) {} else {
    alert("Log out to access this page.");
    location.href = "vault.html";}})