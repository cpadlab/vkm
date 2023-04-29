const lengthRange = document.getElementById("length");
const lengthValue = document.getElementById("length-value");

lengthRange.addEventListener("input", function() {
  lengthValue.textContent = lengthRange.value;
});


const copyBtn = document.getElementById('copy-btn');
const passwordOutput = document.getElementById('password-output');
const popupContent = document.getElementById('popup-content');

copyBtn.addEventListener('click', (event) => {
    event.preventDefault();
    popupContent.style.display = 'block';
    setTimeout(() => {popupContent.style.display = 'none';}, 500);
    const textToCopy = passwordOutput.innerText;
    navigator.clipboard.writeText(textToCopy);
});

const optionsSelect = document.getElementById("options");
const lengthInput = document.getElementById("length");
const generateBtn = document.getElementById("generate");

function generatePassword(event) {
    event.preventDefault();

    if (!optionsSelect || !lengthInput) {
        console.error("No se encontraron elementos de entrada");
        return;
    }

    const option = optionsSelect.value;
    const length = lengthInput.value;

    const formData = new FormData();
    formData.append('option', option);
    formData.append('length', length);

    fetch("php/ac.generate.key.php", {
        method: "POST",
        body: formData})
    .then(response => {return response.json();})
    .then(response => {
        console.log(response);
        const passwordOutput = document.getElementById("password-output");
        passwordOutput.innerText = response.password;})
    .catch(error => {console.error(error);});
}

generateBtn.addEventListener("click", generatePassword);