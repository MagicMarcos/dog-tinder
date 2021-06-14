//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

const petfinder = require('@petfinder/petfinder-js');

const petKeys = process.env.PET_KEY;
const petSecret = process.env.PET_SECRET;

let client = new petfinder.Client({
	apiKey: petKeys,
	secret: petSecret,
});

// this promise will only resolve once, and save the search of dogs for this one session this is not a live update

const dogs = new Promise(async resolve => {
	await client.authenticate();

	const res = await client.animal.search({
		type: 'Dog',
		location: '01752',
		page: 1,
		limit: 100,
	});

	const data = res.data.animals;
	let dataArray = [];

	for (let i = 0; i < data.length; i++) {
		dataArray.push({
			name: data[i].name,
			age: data[i].age,
			breed: data[i].breeds.primary,
			gender: data[i].gender,
			phone: data[i].contact.phone,
			email: data[i].contact.email,
			photo: data[i].photos[0],
		});
	}

	// once this promise resolves, dogs will only ever have the value of dataArray
	resolve(dataArray);
});

async function getDoggos(req, res) {
	const animals = await dogs;
	res.json({ animals });
}

module.exports = getDoggos;
