//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

const petfinder = require('@petfinder/petfinder-js');

const client = new petfinder.Client({
	apiKey: 'PET_F_KEY',
	secret: 'my-api-secret',
});

async function showAnimals(animalType, animalLocation) {
	let page = 1;
	do {
		apiResult = await client.animal.search({
			type: animalType,
			location: animalLocation,
			page,
			limit: 100,
		});
		let dogIdx = (page - 1) * 100;
		apiResult.data.animals.forEach(function (animal) {
			console.log(
				` -- ${++dogIdx}: ${animal.name} id: ${animal.id} url: ${animal.url}`
			);
		});

		page++;
	} while (
		apiResult.data.pagination &&
		apiResult.data.pagination.total_pages >= page
	);
}

(async function () {
	await showAnimals('Dog', '01752');
})();
