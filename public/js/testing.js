// replace null with your website
const yourUrl = null || 'http://localhost:5000';

//determined which object in array is loaded
let num;

//gets next dog in the array
document.querySelector('#refresh').addEventListener('click', nextPup);

//get's array of objects containing dogs
async function getFetch() {
	//sends a request to /api/alldogs route that is in server.js
	const res = await fetch(`${yourUrl}/api/alldogs`);
	const data = await res.json();
	//pass in response to setValues function
	setValues(data);
}
getFetch();

//fires on page reload -> sets num to 0 or whatever is stored in session storage.
//When post requests fires, the user is redirect to the right dog, rather than the first dog in the array
function firstPup() {
	if (sessionStorage.getItem('number') == null) {
		num = 0;
	} else {
		num = sessionStorage.getItem('number');
	}

	console.log(sessionStorage.getItem('number'));
}
firstPup();

//gets next dog in the array, sets new value for num
function nextPup() {
	num++;
	sessionStorage.setItem('number', num);

	getFetch();
}

//sets values for form items -- dog information -- for when post requests are made to save a pet
//handles cases of undefined
function setValues(data) {
	if (data.animals[num].name === undefined) {
		document.querySelector('#name').value = "I don't have a name yet";
	} else {
		document.querySelector('#name').value = data.animals[num].name;
	}

	if (data.animals[num].age === undefined) {
		document.querySelector('#age').value = 'no age provided';
	} else {
		document.querySelector('#age').value = data.animals[num].age;
	}

	if (data.animals[num].breed === undefined) {
		document.querySelector('#breed').value = 'breed info not available';
	} else {
		document.querySelector('#breed').value = data.animals[num].breed;
	}

	if (data.animals[num].gender === undefined) {
		document.querySelector('#gender').value = 'no gender info';
	} else {
		document.querySelector('#gender').value = data.animals[num].gender;
	}

	if (data.animals[num].email == null) {
		document.querySelector('#email').value = 'No Email Provided';
	} else {
		document.querySelector('#email').value = data.animals[num].email;
	}

	if (data.animals[num].phone == null) {
		document.querySelector('#phone').value = 'Contact Not Provided';
	} else {
		document.querySelector('#phone').value = data.animals[num].phone;
	}

	if (data.animals[num].photo == undefined) {
		document.querySelector('h3').innerHTML =
			"Looks like this pup's camera shy.";
		document.querySelector('h3').style.display = 'block';
		document.querySelector('#dogImg').style.display = 'none';
		console.log('no pic');
	} else {
		document.querySelector('#dogImg').style.display = 'block';
		document.querySelector('h3').style.display = 'none';
		document.querySelector('#dogImg').src = data.animals[num].photo.medium;
		document.querySelector('#photo').value = data.animals[num].photo.medium;
	}
}
