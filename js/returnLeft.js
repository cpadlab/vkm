function getSearchFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('error');
}

const error = getSearchFromURL()
document.getElementById("releft").innerHTML = error;
console.log(error)