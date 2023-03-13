function checkPasswords(passwordInput, repeat_passwordInput) {
    if (passwordInput === repeat_passwordInput) {
        return true;
    } else {
        return false;
    }
  }

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const repeat_passwordInput = document.getElementById("rpassword");
const emailInput = document.getElementById("email");
const loginButton = document.getElementById("register-btn");

loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;
  const email = emailInput.value;
  console.log(password)
  console.log(repeat_passwordInput.value)

  if (checkPasswords(password, repeat_passwordInput.value) == true) {

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('email', email);

    fetch("../php/register.php", {
        method: "POST",
        body: formData
    })
    .then(response => {
      return response.json();
    })
    .then(result => {
      console.log(result)
      if (result.success  === true) {
        window.alert('You have successfully registered');
        window.location.href = "http://localhost/vkm/templates/login.html";
      } else {
        window.alert('Not registered successfully');
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  } else {
    window.alert('The passwords have to be the same.');
  }
  
});

