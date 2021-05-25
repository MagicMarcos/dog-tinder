const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const postRoutes = require('./routes/posts');
const petfinder = require('@petfinder/petfinder-js');

//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set('view engine', 'ejs');

//Static Folder
app.use(express.static('public'));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger('dev'));

//Use forms for put / delete
app.use(methodOverride('_method'));

// Setup Sessions - stored in MongoDB
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use('/', mainRoutes);
app.use('/post', postRoutes);

//Server Running
app.listen(process.env.PORT, () => {
	console.log('Server is running, you better catch it!');
});

const petKeys = process.env.PET_KEY;
const petSecret = process.env.PET_SECRET;

//api sdk test
let client = new petfinder.Client({
	apiKey: petKeys,
	secret: petSecret,
});

client.animal
	.search({
		type: 'Dog',
		location: '01752',
		page: 1,
		limit: 5,
	})

	.then(function (res) {
		const data = res.data.animals;
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
