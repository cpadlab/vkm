const register_name = document.getElementById("register-name");
const register_surname = document.getElementById("register-surname");
const register_username = document.getElementById("register-username");
const register_mail = document.getElementById("register-mail");
const register_password = document.getElementById("register-password");
const register_rep_password = document.getElementById("register-rep-password");
const randomTime = Math.floor(Math.random() * 4000) + 1000;

function checkPasswords(password_1, password_2) {
    if (password_1.value === password_2.value) {
        return true;
    } else {
        return false;
    }
  }

fetch("../php/check.sesion.php", {
  method: "POST",
})
.then(response => {
  return response.json();
})
.then(response => {
  if (response.login  === false) {
    
    if (checkPasswords(register_password, register_rep_password) == true) {

        document.getElementById("btnnn-reg").innerHTML = 'Processing...';
        
        setTimeout(function() {
          const name = register_name.value ? register_name.value : 'None';
          const surname = register_surname.value ? register_surname.value : 'None';
          const username = register_username.value ? register_username.value : 'None';
          const mail = register_mail.value ? register_mail.value : 'None';
          const password = register_password.value ? register_password.value : 'None';
          const rep_password = register_rep_password.value ? register_rep_password.value : 'None';
          
          const formRegisterData = new FormData();
          formRegisterData.append('name', name);
          formRegisterData.append('surname', surname);
          formRegisterData.append('username', username);
          formRegisterData.append('mail', mail);
          formRegisterData.append('password', password);
          formRegisterData.append('rep_password', rep_password);

          fetch("../php/tr.register.php", {
              method: "POST",
              body: formRegisterData
})
          .then(response => {
            return response.json();
          })
          .then(result => {
              if (result.success === 'false') {
                alert("An error has occurred.");
                location.href = "register.html";        
              } else {
                alert(name + " Registered Successfully");
                location.href = "setup.html?account=" + username;
              }
          })
        }, randomTime);
    } else {
        alert("Passwords must be the same.");
        location.href = "register.html";
    }
} else {
  alert("Log out to access this page.");
  location.href = "vault.html?user=" + username;
}
})