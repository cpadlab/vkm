const vaultButton = document.getElementById("link-vault");

vaultButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "http://localhost/vkm/templates/vault.html";
})

function startVault(){
    fetch("../php/sesion.php")
    .then(response => {
        return response.json();
    })
    .then(result => {
        const database = result.user;
        console.log(database);
        const formData = new FormData();
        formData.append('database', database);
        if (result.success  === true) {
            fetch("../php/vault-key.php", {
                method: "POST",
                body: formData
            })
            .then(response => {
                return response.json();
            })
            .then (response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        }
    })
}

startVault();
