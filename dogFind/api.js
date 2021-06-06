//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

const petfinder = require('@petfinder/petfinder-js');

const petKeys = process.env.PET_KEY;
const petSecret = process.env.PET_SECRET;

let client = new petfinder.Client({
	apiKey: petKeys,
	secret: petSecret,
});

client.authenticate().then(resp => {
	tokenInfo = {
		token: resp.data.access_token,
		expires: resp.data.expires_in,
		tokenType: resp.data.token_type,
	};
});

// client.animal
// 	.search({
// 		type: 'Dog',
// 		location: '01752',
// 		page: 1,
// 		limit: 5,
// 	})

// 	.then(function (res) {
// 		const data = res.data.animals;
// 		module.exports = function (req, res) {
// 			res.writeHead(200, {
// 				'Content-Type': 'text/json',
// 			});
// 			res.write(JSON.stringify(data));
// 			res.end();
// 		};
// 	})
// 	.catch(function (error) {
// 		console.error(error);
// 	});
