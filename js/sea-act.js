const sear_selectss = document.getElementById("cat-select");
const minput =  document.getElementById("input");

sear_selectss.addEventListener("click", function() {
    const searchval = minput.value;
    window.location.href = "search.html?s=" + encodeURIComponent(searchval);
});