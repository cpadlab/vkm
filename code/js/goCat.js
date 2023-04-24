const selectss = document.getElementById("cat-select");

selectss.addEventListener("change", function() {
    const selectedOption = selectss.value;
    window.location.href = "category.html?category=" + encodeURIComponent(selectedOption);
});