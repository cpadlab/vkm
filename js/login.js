const login_username = document.getElementById("login-username");
const login_password = document.getElementById("login-password");
const randomTime = Math.floor(Math.random() * 4000) + 1000;

function checkArgsv(arg1, arg2) {
    return arg1 && arg2 ? true : false;
  }
  

if (checkArgsv(login_username, login_password) == true) {

    document.querySelector('button').innerHTML = 'Processing...';
    
    const formLoginData = new FormData();
    formLoginData.append('username', login_username);
    formLoginData.append('password', login_password);

    fetch("../php/tr.login.php", {
          method: "POST",
          body: formLoginData
    })
    .then(response => {
      return response.json();
    })
    .then(result => {
      console.log(result.success)
      console.log(result.errors)
        /*if (result.success === 'false') {
          alert("An error has occurred.");
          location.href = "login.html";
        } else {
          alert(username + " Login Successfully");
          location.href = "index.html?account=" + username;
        }*/
    }, randomTime);
} else {
    alert("The entries cannot be empty.");
    location.href = "login.html?user=" + username;
}