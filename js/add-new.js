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
    fetch("../php/sesion.php", {})
    .then(response => {
        return response.json();
    })
    .then(result => {
        const user = result.user
        return user
    });
}

addToVaultBtn.addEventListener('click', () => {
    const usernameInput = document.getElementById("user-input");
    const passwordInput = document.getElementById("pswd-input");
    const siteInput = document.getElementById("siteInput");
    const urlInput = document.getElementById("urlInput");
    const categorySelect = document.getElementById("categorySelect");
    const ddbb = getDDBB();

    const username = usernameInput.value;
    const password = passwordInput.value;
    const site = siteInput.value;
    const url = urlInput.value;
    const category = categorySelect.value;

    const formData = new FormData();
    formData.append('ddbb', ddbb);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('site', site);
    formData.append('url', url);
    formData.append('category', category);

    console.log(formData)

    fetch("../php/add-new.php", {
        method: "POST",
        body: formData
    })
    .then(response => {
      return response.json();
    })
});

