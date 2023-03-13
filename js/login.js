const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-btn");

loginButton.addEventListener("click", (event) => {
  event.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

  const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

  fetch("../php/login.php", {
      method: "POST",
      body: formData
  })
  .then(response => {
    return response.json();
  })
  .then(result => {
    console.log(result)
    if (result.success  === true) {
      document.querySelector(".message2").style.display = "none";
      const currentUser = username;
      fetch("../php/out-sesion.php", {})
      window.location.href = "http://localhost/vkm/templates/index.html?username=" + encodeURIComponent(currentUser);
    } else {
      window.alert('Invalid login with user:' + $username);
      document.querySelector(".message2").style.display = "block";
    }
  })
  .catch(error => {
    console.error("Error:", error);
  });
});
