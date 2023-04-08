let currentCard = 1;
const totalCards = 3;

function nextCard() {
  const nextButton = document.getElementById("btm-nxt");
  if (currentCard < totalCards) {
    currentCard++;
    const cards = document.querySelectorAll('.card');
    const currentCardElement = document.querySelector('.card:not([style*="display: none"])');
    currentCardElement.style.display = 'none';
    const nextCardElement = currentCardElement.nextElementSibling;
    nextCardElement.style.display = 'block';
    if (currentCard === 3) {
      nextButton.innerHTML = "Finalizar";
    }
  } else {
    window.open('https://14wual.github.io/vkm/thanks.html', '_blank');
    location.href = "login.html";
  }
}
