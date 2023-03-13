const showFormBtn = document.getElementById('show-form-btn');
const hiddenFormBtn = document.getElementById('hidden-form-btn');
const addToVaultBtn = document.getElementById('add-nw-key-event');
const blackout = document.querySelector('.blackout');
const ankPanel = document.querySelector('.ank-panel');
const body = document.querySelector('body');

showFormBtn.addEventListener('click', () => {
    blackout.style.display = 'block';
    ankPanel.style.display = 'block';
});

hiddenFormBtn.addEventListener('click', () => {
    ankPanel.style.display = 'none';
    blackout.style.display = 'none';
    document.querySelectorAll('.ank-inputs input').forEach(input => {
        input.value = '';
      });      
});

function getDDBB() {
    let user; 

    return fetch("../php/sesion.php", {})
    .then(response => {
        return response.json();
    })
    .then(result => {
        user = result.user; 
        return user;
    });
}

addToVaultBtn.addEventListener('click', () => {
    const usernameInput = document.getElementById("user-input");
    const passwordInput = document.getElementById("pswd-input");
    const siteInput = document.getElementById("siteInput");
    const urlInput = document.getElementById("urlInput");
    const categorySelect = document.getElementById("categorySelect");  
    getDDBB().then(ddbb => {
        const ddbb1 = ddbb
        const username = usernameInput.value || "none";
        const password = passwordInput.value || "none";
        const site = siteInput.value || "none";
        const url = urlInput.value || "none";
        const category = categorySelect.value || "none";

        const formData = new FormData();
            formData.append('ddbb', ddbb1);
            formData.append('username', username);
            formData.append('password', password);
            formData.append('site', site);
            formData.append('url', url);
            formData.append('category', category);

        fetch("../php/add-new.php", {
            method: "POST",
            body: formData
        })
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log(result)
            if (result.success == true){
                window.location.href = "http://localhost/vkm/templates/vault.html";
            }
        })
    });
});


