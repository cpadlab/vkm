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
                    btnSettings.addEventListener("click", (event) => {
                        event.preventDefault();

                        const div2 = document.createElement('div');
                        div2.className = "sett-panel"

                        const div3 = document.createElement('div');
                        div3.className = "sett-inputs"

                        const div4 = document.createElement('div');
                        div4.className = "sett-inputs-site'"

                        const label1 = document.createElement('label');
                        const label11 = "Site(" + site + "): "
                        label1.innerHTML = label11;

                        const input1 = document.createElement('input');
                        input1.type = 'text';
                        input1.value = site;
                        input1.id = 'siteInput';

                        const br1 = document.createElement('br');

                        const label2 = document.createElement('label');
                        const label22 = "URL: "
                        label2.innerHTML = label22;

                        const formData3 = new FormData();
                            formData.append('database', database || "none");
                            formData.append('site', site || "none");
                            formData.append('user', data[0] || "none");
                            formData.append('password', data[1] || "none");

                        const input2 = document.createElement('input');
                        input2.type = 'text';
                        input2.id = 'urlInput';

                        fetch("../php/get-url.php", {
                            method: "POST",
                            body: formData3
                        })
                        .then(response => {
                            return response.json();
                        })
                        .then(response => {
                            console.log(response);
                            input2.placeholder = response.url;
                        })

                        const div5 = document.createElement('div');
                        div5.className = 'sett-inputs-data';

                        const label3 = document.createElement('label');
                        const label33 = "Username(" + data[0] + "): "
                        label3.innerHTML = label33;

                        const input3 = document.createElement('input');
                        input3.type = 'text';
                        input3.value = data[0];
                        input3.id = 'user-input';

                        const br2 = document.createElement('br');

                        const label4 = document.createElement('label');
                        const label44 = "Password(" + ("*" * data[1]) + "): "
                        label4.innerHTML = label44;

                        const input4 = document.createElement('input');
                        input4.type = 'password';
                        input4.value = data[1];
                        input4.id = 'pswd-input';

                        const div6 = document.createElement('div');
                        div6.className = 'sett-select-cat';

                        const label5 = document.createElement('label');
                        label5.id = 'categorySelects';
                        label5.innerHTML = 'Category: ';

                        const select1 = document.createElement('select');
                        select1.id = 'categorySelect';

                        const option1 = document.createElement('option');
                        option1.value = 'default';
                        option1.innerHTML = 'default';
                        const option2 = document.createElement('option');
                        option2.value = 'social-network';
                        option2.innerHTML = 'social network';
                        const option3 = document.createElement('option');
                        option3.value = 'shopping';
                        option3.innerHTML = 'shopping';
                        const option4 = document.createElement('option');
                        option4.value = 'mails';
                        option4.innerHTML = 'mails';
                        const option5 = document.createElement('option');
                        option5.value = 'webs';
                        option5.innerHTML = 'webs';
                        const option6 = document.createElement('option');
                        option6.value = 'others';
                        option6.innerHTML = 'others';

                        fetch("../php/category-color.php", {
                            method: "POST",
                            body: formData
                        })
                        .then(response => {
                            return response.json();
                        })
                        .then(response => {
                            if (response.category && response.category == "default"){
                                option1.setAttribute('selected', true);    
                            }
                            else if (response.category && response.category == "social network"){
                                option2.setAttribute('selected', true);    
                            }
                            else if (response.category && response.category == "shopping"){
                                option3.setAttribute('selected', true);    
                            }
                            else if (response.category && response.category == "mails"){
                                option4.setAttribute('selected', true);    
                            }
                            else if (response.category && response.category == "webs"){
                                option5.setAttribute('selected', true);    
                            }
                            else if (response.category && response.category == "others"){
                                option6.setAttribute('selected', true);    
                            }
                        })

                        const div7 = document.createElement('div');
                        div7.setAttribute('class', 'sett-btns');

                        const black = document.getElementById("blackout");
                        black.style.display = "block"

                        const button1 = document.createElement('button');
                        button1.id = 'hidden-form-btn';
                        button1.innerHTML = 'Cancel';
                        button1.addEventListener("click", (event) => {
                            event.preventDefault();
                            div2.style.display = 'none';
                            black.style.display = "none"
                        })

                        const button2 = document.createElement('button');
                        button2.id = 'save-newdata-event';
                        button2.innerHTML = 'Save';
                        button2.addEventListener("click", (event) => {
                            event.preventDefault();
                            const formData = new FormData();
                            formData.append('database', database);
                            formData.append('user', input3);
                            formData.append('username', data[0]);
                            formData.append('password', input4);
                            formData.append('nwsite', input1);
                            formData.append('site', site);
                            formData.append('url', input2);
                            formData.append('cat', select1.value);
                            fetch("../php/save-data.php", {
                                method: "POST",
                                body: formData
                            })
                            .then(response => {
                                return response.json();
                            })
                            .then(response => {})
                        })

                        div6.appendChild(label5);
                        select1.appendChild(option1);
                        select1.appendChild(option2);
                        select1.appendChild(option3);
                        select1.appendChild(option4);
                        select1.appendChild(option5);
                        select1.appendChild(option6);
                        div6.appendChild(select1);

                        div5.appendChild(label3);
                        div5.appendChild(input3);
                        div5.appendChild(br2);
                        div5.appendChild(label4);
                        div5.appendChild(input4);

                        div4.appendChild(label1);
                        div4.appendChild(input1);
                        div4.appendChild(br1);
                        div4.appendChild(label2);
                        div4.appendChild(input2);

                        div3.appendChild(div4);
                        div3.appendChild(div5);
                        div3.appendChild(div6);
                        div3.appendChild(div7);

                        div2.appendChild(div3);

                        div7.appendChild(button1);
                        div7.appendChild(button2);
                        
                        document.body.appendChild(div2);

                    })

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
                        const messageP1 = "Are you sure you want to delete: " + site + "(" + data[0] + ")?"
                        messageP.textContent = messageP1;
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
