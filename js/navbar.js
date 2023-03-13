function getUser() {
    return fetch("../php/sesion.php", {})
      .then(response => response.json())
      .then(result => result.user);
  }
  
  const userNavBarElement = document.getElementById("user-name-id-navbar");
  getUser().then(user => {
    console.log(user);
    userNavBarElement.innerText = user;
  });
  