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

                    const divKey = document.createElement('div');
                    divKey.className = 'key-content';
                      
                    const divBanner = document.createElement('div');
                    divBanner.className = 'key-banner';

                    const formData = new FormData();
                    formData.append('database', database);
                    formData.append('site', site);
                    formData.append('user', data[0]);
                    formData.append('password', data[1]);

                    fetch("../php/category-color.php", {
                        method: "POST",
                        body: formData
                    })
                    .then(response => {
                        return response.json();
                    })
                    .then(response => {

                        console.log(response.category)

                        if (response.category && response.category == "default"){
                            const color = "#007bff";
                            divBanner.style.backgroundColor = color;
                        }
                        else if (response.category && response.category == "social network"){
                            const color = "#f00377";
                            divBanner.style.backgroundColor = color;
                        }
                        else if (response.category && response.category == "shopping"){
                            const color = "#00b35c";
                            divBanner.style.backgroundColor = color;
                        }
                        else if (response.category && response.category == "mails"){
                            const color = "#c41421";
                            divBanner.style.backgroundColor = color;
                        }
                        else if (response.category && response.category == "webs"){
                            const color = "#f07e04";
                            divBanner.style.backgroundColor = color;
                        }
                        else if (response.category && response.category == "others"){
                            const color = "#c41421";
                            divBanner.style.backgroundColor = color;
                        }
                        else {
                            const colorError = "#656875";
                            divBanner.style.backgroundColor = colorError;
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        colorError = "#656875"
                        divBanner.style.backgroundColor = colorError;
                    });
                    
                      
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
                    btnDelete.addEventListener("click", (event) => {
                        event.preventDefault();
                        const blackoutDiv = document.createElement("div");
                        const confirmDeleteDiv = document.createElement("div");
                        const messageP = document.createElement("p");
                        const buttonsDiv = document.createElement("div");
                        const yesButton = document.createElement("button");
                        yesButton.addEventListener('click', () => {
                            const formData = new FormData();
                            formData.append('database', database);
                            formData.append('user', data[0]);
                            formData.append('password', data[1]);
                            formData.append('site', site);

                            fetch("../php/delete-key.php", {
                                method: "POST",
                                body: formData
                            })
                            .then(response => {
                                return response.json();
                            })
                            .then(result => {
                                if (result.success == true){
                                    const str = "Removed site(" + site + ") with user(" + data[0] + ")"
                                    window.alert(str);
                                    location.reload();
                                }
                            })
                        });
                        const cancelButton = document.createElement("button");
                        cancelButton.addEventListener('click', () => {
                            confirmDeleteDiv.style.display = 'none';
                            blackoutDiv.style.display = 'none';
                        });

                        blackoutDiv.className = "blackout2";
                        blackoutDiv.style.display = 'block';
                        confirmDeleteDiv.style.display = 'block';
                        confirmDeleteDiv.className = "confirm-delete";
                        messageP.textContent = "Are you sure you want to delete: ?";
                        yesButton.textContent = "Yes";
                        yesButton.id = "buttonYES";
                        cancelButton.textContent = "Cancel";

                        confirmDeleteDiv.appendChild(messageP);
                        buttonsDiv.appendChild(yesButton);
                        buttonsDiv.appendChild(cancelButton);
                        confirmDeleteDiv.appendChild(buttonsDiv);
                        document.body.appendChild(blackoutDiv);
                        document.body.appendChild(confirmDeleteDiv);
                    })
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

            })
        }
    })
}

startVault();
