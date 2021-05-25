// const cloudinary = require('../middleware/cloudinary');
const Post = require('../models/Post');

module.exports = {
	getProfile: async (req, res) => {
		try {
			const posts = await Post.find({ user: req.user.id });
			res.render('profile.ejs', { posts: posts, user: req.user });
		} catch (err) {
			console.log(err);
		}
	},
	getFeed: async (req, res) => {
		try {
			const posts = await Post.find().sort({ createdAt: 'desc' }).lean();
			res.render('feed.ejs', { posts: posts });
		} catch (err) {
			console.log(err);
		}
	},
	getPost: async (req, res) => {
		try {
			const post = await Post.findById(req.params.id);
			res.render('post.ejs', { post: post, user: req.user });
		} catch (err) {
			console.log(err);
		}
	},
	createPost: async (req, res) => {
		try {
			// Upload image to cloudinary
			// const result = await cloudinary.uploader.upload(req.file.path);

			await Post.create({
				name: req.body.name,
				age: req.body.age,
				breed: req.body.breed,
				gender: req.body.gender,
				phone: req.body.phone,
				email: req.body.email,
				photo: req.body.photo,
				// image: result.secure_url,
				// cloudinaryId: result.public_id,
				user: req.user.id,
			});
			console.log('Post has been added!');
			res.redirect('/feed');
		} catch (err) {
			console.log(err);
		}
	},
	deletePost: async (req, res) => {
		try {
			// Find post by id
			// let post = await Post.findById({ _id: req.params.id });

			// Delete post from db
			await Post.remove({ _id: req.params.id });
			console.log('Deleted Post');
			res.redirect('/profile');
		} catch (err) {
			res.redirect('/profile');
		}
	},
};
