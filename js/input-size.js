const lengthRange = document.getElementById("length");
const lengthValue = document.getElementById("length-value");

lengthRange.addEventListener("input", function() {
  lengthValue.textContent = lengthRange.value;
});
