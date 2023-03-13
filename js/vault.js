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
            .then(response => {

                const diccionary = JSON.parse(response);
                for (const site in diccionary) {
                    
                    const data = diccionary[site];

                    console.log(data)

                    const divKey = document.createElement('div');
                    divKey.className = 'key-content';
                      
                    const divBanner = document.createElement('div');
                    divBanner.className = 'key-banner';
                      
                    const imgBanner = document.createElement('img');
                    imgBanner.src = '../imgs/padlock.png';
                      
                    const btnCopy = document.createElement('button');
                    btnCopy.id = 'key-copy-btn';
                    btnCopy.textContent = "Copy";
                      
                    const divInfo = document.createElement('div');
                    divInfo.className = 'key-info';
                      
                    const pSite = document.createElement('p');
                    pSite.id = 'key-site';
                    pSite.textContent = site;
                      
                    const pUser = document.createElement('p');
                    pUser.id = 'key-user';
                    pUser.textContent = data[0];
                      
                    divInfo.appendChild(pSite);
                    divInfo.appendChild(pUser);
                      
                    divBanner.appendChild(imgBanner);
                    divBanner.appendChild(btnCopy);
                      
                    divKey.appendChild(divBanner);
                    divKey.appendChild(divInfo);

                    document.body.appendChild(divKey);
                }

            })
        }
    })
}

startVault();
