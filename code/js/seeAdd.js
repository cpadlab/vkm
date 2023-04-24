const addBtn = document.getElementById('add-btn');
const overlay = document.getElementById('overlay');
const inputss = document.getElementById('dv-nw-psw-site');
 
addBtn.addEventListener('click', function() {
  event.preventDefault();
  inputss.style.display = 'flex';
  overlay.style.display = 'block';
});