const select = document.getElementById("categories-selector");

select.addEventListener("change", function() {
    const selectedOption = select.value;
    window.location.href = "http://localhost/vkm/templates/category.html?category=" + encodeURIComponent(selectedOption);
});