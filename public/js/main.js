//
// Variables
////

// Get the #refresh button
var btn = document.querySelector('#refresh');

// Client credentials
// Replace these with your key/secret
var key = 'HZPA9QyM89D7qr9WkJyUZXQNmWsWcmd6bYK5PIFzFgcc6tT7dD';
var secret = 'BUMy6DHlF00Racaqmog6qzGTDf69V9TEoMDqF5tT';

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

const next = document
	.querySelector('#next')
	.addEventListener('click', nextDog());
function nextDog() {
	num + 1;
	getOAuth().then(function () {
		getPets();
	});
}

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
			document.querySelector('#name').innerText = data.animals[num].name;
			document.querySelector('#age').innerText = data.animals[num].age;
			document.querySelector('#breed').innerText =
				data.animals[num].breeds.primary;
			document.querySelector('#sex').innerText = data.animals[num].gender;
			document.querySelector('#dogImg').src =
				data.animals[num].photos[num].small;
		})
		.catch(function (err) {
			// Log any errors
			console.log('something went wrong', err);
		});
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
			tokenType = data.token_type;
			expires = new Date().getTime() + data.expires_in * 1000;
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

//
// Inits & Event Listeners
//

makeCall();
btn.addEventListener('click', makeCall, false);
