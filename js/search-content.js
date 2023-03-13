function getSearchFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('search');
}


function startVault(){
    fetch("../php/sesion.php")
    .then(response => {
        return response.json();
    })
    .then(result => {
        const search = getSearchFromURL();
        const database = result.user;
        const formData = new FormData();
        formData.append('database', database);
        formData.append('search', search);

        if (result.success  === true) {
            fetch("../php/search-key.php", {
                method: "POST",
                body: formData
            })
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response.trim())
                if (response.trim() === '' || Object.keys(JSON.parse(response)).length === 0) {

                    // Crear un nuevo div para el contenido de la clave
                    const keyContent = document.createElement('div');
                    keyContent.className = 'key-nocontent';

                    const img1 = document.createElement('img');
                    img1.src = '../imgs/x.png';
                    img1.id = 'img-no-results'
                    keyContent.appendChild(img1);

                    const br1 = document.createElement('br');
                    keyContent.appendChild(br1);

                    const p1 = document.createElement('p');
                    p1.textContent = 'No results for ' + search;
                    keyContent.appendChild(p1);

                    const buttonsDiv = document.createElement('div');
                    buttonsDiv.className = 'buttns';

                    const goHomeBtn = document.createElement('button');
                    goHomeBtn.id = 'go-home';
                    goHomeBtn.textContent = 'Go Home';
                    buttonsDiv.appendChild(goHomeBtn);

                    const goVaultBtn = document.createElement('button');
                    goVaultBtn.id = 'go-vault';
                    goVaultBtn.textContent = 'Go Vault';
                    buttonsDiv.appendChild(goVaultBtn);

                    keyContent.appendChild(buttonsDiv);
                    document.body.appendChild(keyContent);

                    goHomeBtn.addEventListener('click', () => {
                        window.location.href = 'http://localhost/vkm/templates/index.html';
                    });
                    goVaultBtn.addEventListener('click', () => {
                        window.location.href = 'http://localhost/vkm/templates/vault.html';
                    });

                }
                else {
                    const diccionary = JSON.parse(response);
                    for (const site in diccionary) {
                        
                        const data = diccionary[site];

                        const divKey = document.createElement('div');
                        divKey.className = 'key-content';
                        
                        const divBanner = document.createElement('div');
                        divBanner.className = 'key-banner';
                        const colors = ['#ff8400', '#ff007b', '#007bff'];
                        const randomColor = colors[Math.floor(Math.random() * colors.length)];
                        divBanner.style.backgroundColor = randomColor;
                        
                        const imgBanner = document.createElement('img');
                        imgBanner.src = '../imgs/padlock.png';
                        
                        const btnCopy = document.createElement('button');
                        btnCopy.id = 'key-copy-btn';
                        btnCopy.textContent = "Copy";
                        btnCopy.addEventListener("click", (event) => {
                            event.preventDefault();
                            navigator.clipboard.writeText(data[1])
                        })
                        
                        const divInfo = document.createElement('div');
                        divInfo.className = 'key-info';
                        
                        const pSite = document.createElement('p');
                        pSite.id = 'key-site';
                        pSite.textContent = site;
                        
                        const pUser = document.createElement('p');
                        pUser.id = 'key-user';
                        pUser.textContent = data[0];

                        const divInfoBTN = document.createElement('div');
                        divInfoBTN.className = 'key-info-btn';

                        const btnSettings = document.createElement('button');
                        btnSettings.id = 'key-sett-btn';
                        const imgSettings = document.createElement('img');
                        imgSettings.id = 'key-sett-btn-img';
                        imgSettings.src = 'http://localhost/vkm/imgs/settings.png';
                        btnSettings.appendChild(imgSettings);

                        const btnDelete = document.createElement('button');
                        btnDelete.id = 'key-delete-btn';
                        const imgDelete = document.createElement('img');
                        imgDelete.id = 'key-delete-btn-img';
                        imgDelete.src = 'http://localhost/vkm/imgs/trash.png';
                        btnDelete.appendChild(imgDelete);
                        
                        divInfo.appendChild(pSite);
                        divInfo.appendChild(pUser);

                        divInfoBTN.appendChild(btnSettings);
                        divInfoBTN.appendChild(btnDelete);

                        divInfo.appendChild(divInfoBTN);
                        
                        divBanner.appendChild(imgBanner);
                        divBanner.appendChild(btnCopy);
                        
                        divKey.appendChild(divBanner);
                        divKey.appendChild(divInfo);

                        document.body.appendChild(divKey);
                    }
                }

            })
        }
    })
}

startVault();
    