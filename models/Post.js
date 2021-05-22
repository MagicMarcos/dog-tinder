const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		require: true,
	},
	cloudinaryId: {
		type: String,
		require: true,
	},
	caption: {
		type: String,
		required: true,
	},
	breed: {
		type: String,
		required: true,
	},
	kids: {
		type: String,
		required: true,
	},
	dogs: {
		type: String,
		required: true,
	},
	cats: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Post', PostSchema);
