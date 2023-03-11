const copyBtn = document.getElementById('copy-btn');
const passwordOutput = document.getElementById('password-output');

copyBtn.addEventListener('click', () => {
  const textToCopy = passwordOutput.innerText;
  navigator.clipboard.writeText(textToCopy);
});
