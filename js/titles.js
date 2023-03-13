

function getSearchFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('search');
}
function getCategoryFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('category');
}

try {
    const searchTitle = document.getElementById("link-search");
    const search = getSearchFromURL()
    const tittleSearch = "VKM | Search: " + search;
    searchTitle.innerText = tittleSearch
} catch {
    const catTitle = document.getElementById("link-cat");
    const cat = getCategoryFromURL()
    const tittleCat = "VKM | Vault.Category: " + cat;
    catTitle.innerText = tittleCat
}
