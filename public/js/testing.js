document.querySelector('h1').addEventListener('click', getFetch());
function getFetch() {
	let response = await fetch(server.js);
	if (response.ok) {
		let json = await response.json();
	}
}

console.log('hopwdy');
