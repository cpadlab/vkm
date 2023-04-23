const addKeyBtn = document.getElementById('btnnn-add');

function checkArgs(arg1, arg2, arg3, arg4) {
    console.log(arg1, arg2, arg3, arg4)
    if (arg1.trim() !== '' && arg2.trim() !== '' && arg3.trim() !== '' && arg4.trim() !== '') {
      return true;
    } else {
      return false;
    }
  }

  function checkPasswords(password_1, password_2) {
    if (password_1.value === password_2.value) {
        return true;
    } else {
        return false;
    }
  }
 
addKeyBtn.addEventListener('click', function(event) {
    event.preventDefault();

    const innwpswsite_name = document.getElementById("dv-nw-psw-site-name")
    const innwpswsite_url = document.getElementById("dv-nw-psw-site-url")
    const innwpswsite_username = document.getElementById("dv-nw-psw-site-username")
    const innwpswsite_password = document.getElementById("dv-nw-psw-site-password")
    const innwpswsite_rpassword = document.getElementById("dv-nw-psw-site-rpassword")
    const innwpswsite_cat = document.getElementById("dv-nw-psw-site-cat-select")

    fetch("../php/check.sesion.php", {
        method: "POST",
      })
      .then(response => {
        return response.json();
      })
      .then(response => {
      
        if (response.login  === true) {
          
            const username = response.username;
            const innwpswsite_name_value = innwpswsite_name.value;
            const innwpswsite_url_value = innwpswsite_url.value ?? "None";
            const innwpswsite_username_value = innwpswsite_username.value;
            const innwpswsite_password_value = innwpswsite_password.value;
            const innwpswsite_rpassword_value = innwpswsite_rpassword.value;
            const innwpswsite_cat_value = innwpswsite_cat.value;
            
            if (checkArgs(innwpswsite_name_value, innwpswsite_username_value, innwpswsite_password_value, innwpswsite_rpassword_value) == true) {

                if (checkPasswords(innwpswsite_password_value, innwpswsite_rpassword_value) == true) {
                
                    const formAddKData = new FormData();
                    formAddKData.append('username', username);
                    formAddKData.append('innwpswsite_name', innwpswsite_name_value);
                    formAddKData.append('innwpswsite_url', innwpswsite_url_value);
                    formAddKData.append('innwpswsite_username', innwpswsite_username_value);
                    formAddKData.append('innwpswsite_password', innwpswsite_password_value);
                    formAddKData.append('innwpswsite_rpassword', innwpswsite_rpassword_value);
                    formAddKData.append('innwpswsite_cat', innwpswsite_cat_value);

                    fetch("../php/tr.addKey.php", {
                    method: "POST",
                    body: formAddKData
                    })
                    .then(response => {
                        return response.json();
                    })
                    .then(result => {
                        if (result.success === true) {
                            alert(innwpswsite_name_value + " Added Correct.");
                            location.href = "vault.html";
                        } else {
                            alert("Error: ");
                            location.href = "vault.html"; 
                        }
                    })

                } else {
                    alert("Error: Password must be the same.");
                    location.href = "vault.html";      
                }
            } else {
                alert("Error: Arguments must not be empty.");
                location.href = "vault.html";      
            }

        } else {
          alert("Sesion Expired.");
          location.href = "login.html";
        }
      })

});