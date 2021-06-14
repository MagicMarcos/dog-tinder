# I Found My Best Friend
<p> A tinder inspired web application, for matching prospective adoption seekers in the Boston region, with their future best friends! </p>
App is live at https://ifoundmybff.herokuapp.com

<h1>How It's Made:</h1>
<p>Utilized: </p> 
    <ul> 
        <li>JavaScript</li>
        <li>Node</li>
        <li>Express</li>
        <li>EJS</li>
        <li>CSS(flexbox and grid)</li>
        <li>Mongoose</li>
        <li>Passport (auth)</li>
        <li>Petfinder API SDK</li>
    </ul>
<p>The current product utilizes M-V-C based architecture.</p>
<p>Users are able to sign up for an account and search through a list of adoptable pets in the Boston region. At this time an actual matching feature would be hard to implement without cooperation from individual shelters. Thus users are able to save the details of the dogs they "swipe right" on.<p/>


<h1>Lessons Learned:</h1>
<p>Through building this app, I was able to get comfortable with the basics of GET, PUT, POST and DELETE. As well as further familiarizing myself in using EJS.</p>
<p>Additionally, I was better able to vizualize and familiarize myself with how these requests are made, through the use of MVC. </p>
<p>I found that organizing files, introduced some fun new challenges in keeping track of the apps functionalities.</p>
<p>Using the SDK of a well documented API was a refreshing experience and being able to do all the authentication in the backend was amazing.</p>

<h1>Optimizations</h1>
<p>As someone with not background in art, styling could definitely use improvements.</p>
<p>Some of the code needs to refactored for better readabiility. </p>
<p>Upcoming features: </p>
    <ul> 
        <li>Allowing users to determine their original location</li>
        <li>Accessibilty features like, high contrast and zoom in options</li>
        <li>Convining the dogs to let me include cats in the searches</li>
    </ul>
    
    
    
---

# Running the app Locally

<h2> Install </h2>

`npm install`


<h2> Things to add </h2>

- Create a `.env` file and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - PET_KEY = `your petfinder api key`
  - PET_SECRET = `your petfinder api secret`


<h2> Run </h2>

`npm start`
