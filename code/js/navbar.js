document.addEventListener("DOMContentLoaded", function() {
    function goVault() {location.href = "vault.html";}
    const vault_go_btn = document.getElementById("vault-btn");
    if(vault_go_btn) {
        vault_go_btn.addEventListener("click", function() {goVault()});
    }
  
    const logout_btn = document.getElementById("logout.ac");
    if(logout_btn) {
        logout_btn.addEventListener("click", function() {
            fetch("php/ac.log-out.php", {method: "POST"})
            .then(response => {location.href = "login.html";})
        });
    }
});
  