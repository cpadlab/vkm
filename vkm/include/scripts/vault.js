/*
      _         
 __ _| |___ __  
 \ V / / / '  \  v6.0
  \_/|_\_\_|_|_|

VKM v6.0
Author: Carlos Padilla (cpadlab)
Proyect: https://github.com/cpadlab/vkm
*/

$('header').load('vkm/include/content/vault/navbar.html');
$('#section-2').load('vkm/include/content/vault/section-2.html'); 
$('#section-1').load('vkm/include/content/vault/section-1.html');

document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'hidden') {$('.alerts').load('vkm/include/content/pop-up/auto-logout.html');}
});

$('footer').load('vkm/include/content/footer.html', function() {});