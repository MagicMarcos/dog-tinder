const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	photo: {
		type: String,
		require: true,
	},
	name: {
		type: String,
		required: true,
	},
	age: {
		type: String,
		required: true,
	},
	breed: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	email: {
		type: String,
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
