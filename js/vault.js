
var select = document.getElementById("cat-select");
	


fetch("../php/check.sesion.php", {
    method: "POST",
})
.then(response => {
    return response.json();
})
.then(response => {

    const username = response.username;

	fetch("../php/tr.category.php", {
		method: "POST",
		body: username
	})
	.then(response => {
	return response.json();
	})
	.then(result => {
		console.log(result)
	})

	var opciones = ["Opción 1", "Opción 2", "Opción 3"];

	for (var i = 0; i < opciones.length; i++) {
		var option = document.createElement("option");
		option.text = opciones[i];
		select.appendChild(option);
	}
})