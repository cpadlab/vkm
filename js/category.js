
var select = document.getElementById("cat-select");
var select2 = document.getElementById("dv-nw-psw-site-cat-select")

fetch("../php/check.sesion.php", {
    method: "POST",
})
.then(response => {
    return response.json();
})
.then(response => {
	
    const username = response.username;

	const formCatData = new FormData();
	formCatData.append('username', username);

	fetch("../php/tr.category.php", {
		method: "POST",
		body: formCatData
	})
	.then(response => {
	return response.json();
	})
	.then(result => {
		
		const diccionary = JSON.parse(result);

		for (var i = 0; i < diccionary.length; i++) {
			var option = document.createElement("option");
			option.text = diccionary[i];
			select.appendChild(option);
		
			var option2 = document.createElement("option");
			option2.text = diccionary[i];
			select2.appendChild(option2);
		}
		
	})
})