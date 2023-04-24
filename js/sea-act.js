const sear_selectss = document.getElementById("search-btn");
const minput =  document.getElementById("input");

sear_selectss.addEventListener("click", function() {
    const searchval = minput.value;
    window.location.href = "search.html?s=" + encodeURIComponent(searchval);
});