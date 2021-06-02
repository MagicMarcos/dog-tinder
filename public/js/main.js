//
// Variables

// Get the #refresh button
var btn = document.querySelector('#refresh');

// Client credentials
// Replace these with your key/secret
var key = ;
var secret = ;
// Call details
var org = 'dog';
var status = 'adoptable';
let where = '01752';

// Token
var token, tokenType, expires;

//
// Methods
//

/**
 * Get pet data and render into the UI
 * @return {Promise} The fetch() Promise object
 */

let num = 0;

function nextDog() {
	getOAuth().then(function () {
		getPets();
	});
}

nextDog();
function getPets() {
	return fetch(
		'https://api.petfinder.com/v2/animals?type=' +
			org +
			'&status=' +
			status +
			'&location=' +
			where,
		{
			headers: {
				Authorization: tokenType + ' ' + token,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		}
	)
		.then(function (resp) {
			// Return the API response as JSON
			return resp.json();
		})
		.then(function (data) {
			// Log the pet data

			console.log('pets', data.animals);

			var pets = data;
			showPets(pets);
		})
		.catch(function (err) {
			// Log any errors
			console.log('something went wrong', err);
		});
}

function showPets(data) {
	setValues(data);
	num++;
}

function setValues(data) {
	document.querySelector('#name').value = data.animals[num].name;
	document.querySelector('#age').value = data.animals[num].age;
	document.querySelector('#breed').value = data.animals[num].breeds.primary;
	document.querySelector('#gender').value = data.animals[num].gender;

	if (data.animals[num].contact.email == null) {
		document.querySelector('#email').value = 'No Email Provided';
	} else {
		document.querySelector('#email').value = data.animals[num].contact.email;
	}

	if (data.animals[num].contact.phone == null) {
		document.querySelector('#phone').value = 'Contact Not Provided';
	} else {
		document.querySelector('#phone').value = data.animals[num].contact.phone;
	}

	if (data.animals[num].photos[0] == undefined) {
		console.log('no pic');
	} else {
		document.querySelector('#dogImg').src = data.animals[num].photos[0].small;
	}
	document.querySelector('#photo').value = data.animals[num].photos[0].small;
}

/**
 * Get OAuth credentials
 * @return {Promise} The fetch() Promise object
 */
function getOAuth() {
	return fetch('https://api.petfinder.com/v2/oauth2/token', {
		method: 'POST',
		body:
			'grant_type=client_credentials&client_id=' +
			key +
			'&client_secret=' +
			secret,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	})
		.then(function (resp) {
			// Return the response as JSON
			return resp.json();
		})
		.then(function (data) {
			// Log the API data
			console.log('token', data);

			// Store token data
			token = data.access_token;
			tokenType = 'Bearer';
			expires = new Date().getTime() + data.expires_in * 1000;
			console.log(tokenType);
		})
		.catch(function (err) {
			// Log any errors
			console.log('something went wrong', err);
		});
}

/**
 * Get a token and fetch pets
 */
var makeCall = function () {
	// If current token is invalid, get a new one
	if (!expires || expires - new Date().getTime() < 1) {
		console.log('new call');
		getOAuth().then(function () {
			getPets();
		});
		return;
	}

	// Otherwise, get pets
	console.log('from cache');
	getPets();
};

// makeCall();
btn.addEventListener('click', makeCall, false);
