const params = new URLSearchParams(location.search);
const account_username = params.get("account");
document.querySelector('title').innerHTML = "VKM | Setup: " + account_username;
document.getElementById("welcome-h2").innerHTML = "Welcome: " + account_username + "!";
document.getElementById("welcome-p").innerHTML = account_username + ", we are going to carry out a few steps, to improve your experience in VKM.";
document.getElementById("step2-p").innerHTML = account_username + ", download the recovery file. If you lose your password, you can recover your account with this file!";

let currentCard = 1;
const totalCards = 4;

function nextCard() {
    const nextButton = document.getElementById("btm-nxt");
    if (currentCard < totalCards) {
        currentCard++;
        const cards = document.querySelectorAll('.card');
        const currentCardElement = document.querySelector('.card:not([style*="display: none"])');
        currentCardElement.style.display = 'none';
        const nextCardElement = currentCardElement.nextElementSibling;
        nextCardElement.style.display = 'block';
        if (currentCard === 4) {
            DownloadToken()
            nextButton.innerHTML = "Finalizar";}
    } else {
        window.open('https://14wual.github.io/vkm/thanks.html', '_blank');
        location.href = "login.html";
    }
}

function DownloadCSV() {
    const fileUrl = 'download/vkm_import_template.csv';
    fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileUrl;
        link.dispatchEvent(new MouseEvent('click'));
    });
}

function DownloadToken() {
    const fileUrl = 'temp/' + account_username + '.key';
    fetch(fileUrl)
        .then(response => response.blob())
        .then(blob => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'temp/' + account_username + '.key';
        link.dispatchEvent(new MouseEvent('click'));
    });
}