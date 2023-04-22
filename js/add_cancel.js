function addPasswEvent() {
  const addBtn = document.querySelector('.add-btn');
  const overlay = document.querySelector('.overlay');
  const dvNwPswSite = document.querySelector('.dv-nw-psw-site');

  addBtn.addEventListener('click', function() {
    overlay.style.display = 'block';
    dvNwPswSite.style.visibility = 'visible';
  });
}

function CanceladdPasswEvent() {
  const overlay = document.querySelector('.overlay');
  const dvNwPswSite = document.querySelector('.dv-nw-psw-site');
  overlay.style.display = 'none';
  dvNwPswSite.classList.remove('dv-nw-psw-site');
}
