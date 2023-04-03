const register_name = document.getElementById("register-name");
const register_surname = document.getElementById("register-surname");
const register_username = document.getElementById("register-username");
const register_mail = document.getElementById("register-mail");
const register_password = document.getElementById("register-password");
const register_rep_password = document.getElementById("register-rep-password");

function checkPasswords(password_1, password_2) {
    if (password_1 === password_2) {
        return true;
    } else {
        return false;
    }
  }

if (checkPasswords(register_password.value, register_rep_password.value) == true) {

    const formRegisterData = new FormData();
      formRegisterData.append('name',register_name.value);
      formRegisterData.append('surname',register_surname.value);
      formRegisterData.append('username',register_username.value);
      formRegisterData.append('mail',register_mail.value);
      formRegisterData.append('password',register_password.value);
      formRegisterData.append('rep_password',register_rep_password.value);

    fetch("../php/trans-register.php", {
        method: "POST",
        body: formRegisterData
    })
    .then(response => {
      return response.json();
    })
    .then(result => {
      console.log(result)
    })
}