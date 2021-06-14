//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

const petfinder = require('@petfinder/petfinder-js');

const petKeys = process.env.PET_KEY;
const petSecret = process.env.PET_SECRET;

let client = new petfinder.Client({
	apiKey: petKeys,
	secret: petSecret,
});

// this promise will only resolve once, and save the search of dogs
// for this one session
// this is not a live update
const dogs = new Promise(
  async (resolve) => {

    await client.authenticate()

    // I'm not sure what this code is meant for as tokenInfo is not defined anywhere
    // if you do need it, you'll want to save the authentication as a response and then use that in a new evaluation
    
    /*
    .then(resp => {
      tokenInfo = {
        token: resp.data.access_token,
        expires: resp.data.expires_in,
        tokenType: resp.data.token_type,
      };
    });
     */ 
    
      const res = await client.animal
        .search({
          type: 'Dog',
          location: '01752',
          page: 1,
          limit: 3,
        })
    
      const data = res.data.animals;
      let dataArray = [];
    
      for (let i = 0; i < data.length; i++) {
        dataArray.push({
          name: data[i].name,
          age: data[i].age,
          breed: data[i].breed,
          gender: data[i].gender,
          phone: data[i].contact.phone,
          email: data[i].contact.email,
          photo: data[i].primary_photo_cropped.medium,
        });
      }
      // once this promise resolves, dogs will only ever have the value of dataArray
    resolve(
      dataArray
    )
  }
);

async function getDoggos(req, res){
  res.json({ dogs });
}


<<<<<<< HEAD
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
				// photo: data[i].primary_photo_cropped.small,
			});
		}
		console.log(data);
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
=======
	// .catch(function (error) {
	// 	console.error(error);
	// });
module.exports = getDoggos;
>>>>>>> 84e0f94396cd4a62678a8b41548ee81cee6bbe45
