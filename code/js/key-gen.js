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

    fetch("../php/gen-key.php", {
        method: "POST",
        body: formData
    })
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.log(response);
        const passwordOutput = document.getElementById("password-output");
        passwordOutput.innerText = response.password;
    })
    .catch(error => {
        console.error(error);
    });
}

generateBtn.addEventListener("click", generatePassword);
