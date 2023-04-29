function getColorByCategory(category) {
    const colorsByCategory = {
      'social network': '#f00377',
      'shopping': '#00b35c',
      'mails': '#c41421',
      'webs': '#f07e04',
      'others': '#c41421',
      'error': '#656875'};
    return colorsByCategory[category] || '#007bff';
}

function getSearchFromURL(variable) {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(variable);
}

function show_keys(diccionary) {

    for (const site in diccionary) {
            
        const data = diccionary[site];

        const label_code = data[0];
        const label_site = data[1];
        const label_username = data[4];
        const label_password = data[2];
        const label_url = data[3];                

        const divKey = document.createElement('div');
        divKey.className = 'key-content';
        const divBanner = document.createElement('div');
        divBanner.className = 'key-banner';
        const imgBanner = document.createElement('img');
        imgBanner.src = 'img/padlock.png';
        const btnCopy = document.createElement('button');
        btnCopy.id = 'key-copy-btn';
        btnCopy.textContent = "Copy";
        btnCopy.addEventListener("click", (event) => {
            event.preventDefault();
            navigator.clipboard.writeText(label_password)
        })
        const divInfo = document.createElement('div');
        divInfo.className = 'key-info';
        const pSite = document.createElement('p');
        pSite.id = 'key-site';
        pSite.textContent = label_site;
        const pUser = document.createElement('p');
        pUser.id = 'key-user';
        pUser.textContent = label_username;
        const divInfoBTN = document.createElement('div');
        divInfoBTN.className = 'key-info-btn';
        
        const btnSettings = document.createElement('button');
        btnSettings.id = 'key-sett-btn';

        const iconPen = document.createElement('i');
        iconPen.className = 'fa-solid fa-pen';
        btnSettings.appendChild(iconPen);
        btnSettings.addEventListener("click", (event) => {
            event.preventDefault();
            location.href = "edit.html?key=" + label_code;
        })
        
        const cat_color = getColorByCategory(data[5]);
        divBanner.style.backgroundColor = cat_color;

        const btnDelete = document.createElement('button');
        btnDelete.id = 'key-delete-btn';

        const iconTrash = document.createElement('i');
        iconTrash.className = 'fa-solid fa-trash';
        btnDelete.addEventListener("click", (event) => {
            event.preventDefault();
            
        })

        btnDelete.appendChild(iconTrash);
        
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

function category_page_function() {

    const category = getSearchFromURL('category')
    document.getElementById("category_title_page").innerHTML = 'VKM | Vault: ' + category;

    fetch("php/check.sesion.php", {method: "POST",})
    .then(response => {return response.json();})
    .then(response => {
        
        const username = response.username;
        const formKeyCatData = new FormData();
        formKeyCatData.append('username', username);
        formKeyCatData.append('category', category);
        
        fetch("php/tr.get.category-keys.php", {
            method: "POST",
            body: formKeyCatData})
        .then(response => {return response.json();})
        .then(response => {show_keys(JSON.parse(response))})
    })
}

function search_page_function(){
    
    const search = getSearchFromURL('s')
    document.getElementById("search_title_page").innerHTML = 'VKM | Search: ' + search;

    fetch("php/check.sesion.php", {method: "POST",})
    .then(response => {return response.json();})
    .then(response => {
        
        const username = response.username;
        const formKeySeData = new FormData();
        formKeySeData.append('username', username);
        formKeySeData.append('search', search);
        
        fetch("php/tr.get.search-keys.php", {
            method: "POST",
            body: formKeySeData})
        .then(response => {return response.json();})
        .then(response => {show_keys(JSON.parse(response));})
    })
}

function vault_page_function() {

    fetch("php/check.sesion.php", {method: "POST",})
    .then(response => {return response.json();})
    .then(response => {
    
        const username = response.username;
        document.getElementById("vault_title_page").innerHTML = 'VKM | Vault: ' + username;

        const formKeyData = new FormData();
        formKeyData.append('username', username);
    
        fetch("php/tr.get.keys.php", {
            method: "POST",
            body: formKeyData})
        .then(response => {return response.json();})
        .then(response => {show_keys(JSON.parse(response));})
    })
}

document.addEventListener("DOMContentLoaded", function() {

    const page_title = document.getElementsByTagName("title")[0].id

    switch (true) {
        case page_title == "category_title_page":
            category_page_function();
            break;
        case page_title == "search_title_page":
            search_page_function();
            break;
        case page_title == "vault_title_page":
            vault_page_function();
            break;
        default:
            var title_error__reload_page = confirm("Error: Unknown page. Reload the page or restart the browser.");
            if (title_error__reload_page == true) {location.reload()} else {}            
    }
});