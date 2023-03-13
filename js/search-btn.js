const botonBusqueda = document.querySelector(".search-btn");

botonBusqueda.addEventListener("click", function() {
    const inputText = document.querySelector('.search-bar').value;
    window.location.href = "http://localhost/vkm/templates/search.html?search=" + encodeURIComponent(inputText);
}); 

