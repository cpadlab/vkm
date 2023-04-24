const copyBtn = document.getElementById('copy-btn');
const passwordOutput = document.getElementById('password-output');
const popupContent = document.getElementById('popup-content');

copyBtn.addEventListener('click', () => {
    popupContent.style.display = 'block';
  setTimeout(() => {
    popupContent.style.display = 'none';
  }, 1000);
  const textToCopy = passwordOutput.innerText;
  navigator.clipboard.writeText(textToCopy);
});
