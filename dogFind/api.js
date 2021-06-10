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

client.animal
	.search({
		type: 'Dog',
		location: '01752',
		page: 1,
		limit: 3,
	})

	.then(function (res) {
		const data = res.data.animals;
		let dataOBJ = [];
		for (let i = 0; i < data.length; i++) {
			dataOBJ.push({
				name: data[i].name,
				age: data[i].age,
				breed: data[i].breed,
				gender: data[i].gender,
				phone: data[i].contact.phone,
				email: data[i].contact.email,
				photo: data[i].primary_photo_cropped.medium,
			});
		}
		console.log(dataOBJ);
		module.exports = function (req, res) {
			res.writeHead(200, {
				'Content-Type': 'text/json',
			});
			res.write(JSON.stringify(data));
			res.end();
		};
	})
	.catch(function (error) {
		console.error(error);
	});
