document.querySelector('h1').addEventListener('click', getFetch());

// replace null with your website
const yourUrl = null || "http://localhost:5000"

//using async/await syntax makes fetching easier
async function getFetch() {
  //sends a request to /api/alldogs route that is in server.js
  const res = await fetch(`${yourUrl}/api/alldogs`);
  const data = await res.json();
  // you can do anything with this data now
  console.log(data)
}

console.log('hopwdy');
