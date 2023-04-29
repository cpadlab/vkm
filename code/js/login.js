function getSearchFromURL(variable) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(variable);}

document.getElementById("releft").innerHTML = getSearchFromURL('error');
const ac_login_btn = document.getElementById("btn-ac-login")
function checkArgsv(arg1, arg2) {return arg1.value && arg2.value ? true : false;}

ac_login_btn.addEventListener("click", function(event) {
    event.preventDefault();

    const login_username = document.getElementById("login-username");
    const login_password = document.getElementById("login-password");
    
    fetch("php/check.sesion.php", {method: "POST",})
    .then(response => {return response.json();})
    .then(response => {
  
        if (response.login  === false) {

            if (checkArgsv(login_username, login_password) == true) {

                ac_login_btn.innerHTML = 'Processing...';
                const username = login_username.value
                const password = login_password.value

                const formLoginData = new FormData();
                formLoginData.append('username', username);
                formLoginData.append('password', password);

                fetch("php/ac.login.php", {
                        method: "POST",
                        body: formLoginData})
                .then(response => {return response.json();})
                .then(result => {
                    if (!result.success) {
                    switch (result.errors[0]) {
                        case "Username does not exist":
                            location.href = "login.html?error=Username%20does%20not%20exist.";
                            break;
                        case "The account status is incorrect":
                            location.href = "login.html?error=The%20account%20status%20is%20incorrect.";
                            break;
                        case "The account status is blocked":
                            location.href = "recovery.html?account=" + username;
                            break;
                        case "Password is incorrect":
                            location.href = "login.html?error=Password%20is%20incorrect.";
                            break;
                        case "Unknown response from server":
                            location.href = "login.html?error=Unknown%20response%20from%20server";
                            break;
                        default:
                            console.error("Unknown error:", result.errors);
                            break;}
                    } else {
                        alert(username + " Login Successfully");
                        location.href = "vault.html?user=" + username;
                }}, 500);    
            } else {
                alert("The entries cannot be empty.");
                location.href = "login.html?user=" + username;}
        } else {
            alert("Log out to access this page.");
            location.href = "vault.html?user=" + username;}
    })
  
});