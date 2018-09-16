const express = require('express');
const bodyparser = require('body-parser');
const Sequelize = require('sequelize');
const _USERS = require('../data/users.json')	//eslint-disable-line
const _POSTS = require('../data/posts.json')	//eslint-disable-line
const app = express();
const port = 8001;
const log = require('../../config/logger');


const connection = new Sequelize('db', 'user', 'pass', {
	host: 'localhost',
	dialect: 'sqlite',
	storage: 'db.sqlite',
	operatorsAliases: false, // query operators can be given string shortcuts. Disallowing this option is more secure
	define: {						// set default properties on a model when it is created

	}
});


const User = connection.define('User', {
	name: Sequelize.STRING,
	email: {
		type: Sequelize.STRING,
		validate: {
			isEmail: true
		}
	},
	password: {
		type: Sequelize.STRING,
		validate: {
			isAlphanumeric: true
		}
	}
}, {
	// force: true
});

const Post = connection.define('Post', {
	title: Sequelize.STRING,
	content: Sequelize.TEXT
}, {
	 force: true
});

const Comment = connection.define('Comment', {
	content: {
		type: Sequelize.TEXT
	}
}, {
	force: true
});

Post.belongsTo(User, {
	as: 'UserRef',					// alias the User table to something else
	foreignKey: 'userId'
});									// rename the foreign key. Default is UserId.
Post.hasMany(Comment, {
	as: 'allComments',
	foreignKey: 'fromPostId'
});


function addUsersFromFile(file) {
	User.bulkCreate(file)
		.then(() => log.info('Bulk create users success'))
		.error(err => log.error(`Could not create users ${err}`));
}

function addPostsFromFile(file) {
	Post.create({ userId: 1, title: 'Manual Title1', content: 'Lorem Ipsum' });
	Post.create({ userId: 2, title: 'Manual Title2', content: 'Lorem Ipsum' });
	// Post.bulkCreate(file)
	// 	.then(() => log.info('Bulk create posts success'))
	// 	.error(err => log.error(`Could not create posts ${err}`));
}

function createComments() {
	Comment.create({ content: 'Lorem Ipsum 1', fromPostId: 1 });
	Comment.create({ content: 'Lorem Ipsum 2', fromPostId: 1 });
	Comment.create({ content: 'Lorem Ipsum 3', fromPostId: 1 });
	Comment.create({ content: 'Lorem Ipsum 4', fromPostId: 1 });

	Comment.create({ content: 'Lorem Ipsum 3', fromPostId: 2 });
	Comment.create({ content: 'Lorem Ipsum 4', fromPostId: 2 });
	Comment.create({ content: 'Lorem Ipsum 5', fromPostId: 2 });
	Comment.create({ content: 'Lorem Ipsum 6', fromPostId: 2 });
}

connection
	.sync({
		logging: log.info
	})
	.then(() => {
		log.info('Connected to DB');
		// addUsersFromFile(_USERS.users);
		addPostsFromFile(_POSTS.posts);
		createComments();
	})
	.catch((err) => {
		log.error(`Unable top connect to db: ${err}`);
	});

app.listen(port, () => {
	log.info('Server running on port 8001');
});

const postRoutes = express.Router();

postRoutes.route('/')
	.get((req, res) => {
		Post.findAll({
			include: {
				model: User,
				as: 'UserRef'			// we aliased the model name above wehn we defined the belongsTo relationship
			}
		})
			.then(rows => res.json(rows))
			.error((e) => {
				res.json(e);
			});
	})
	.post((req, res) => {
		Post.create({
			title: req.body.title,
			content: req.body.content,
		}).then((post) => {
			res.status(200).json(post);
		}).error((err) => {
			res.json(err);
		});
	});

postRoutes.route('/:postId')
	.get((req, res) => {
		Post.findById(req.params.postId, {
			include: [{
				model: Comment,
				as: 'allComments',
				attributes: ['content']
			}, {
				model: User,
				as: 'UserRef',
				attributes: ['name', 'email']
			}]
		})
			.then((post) => {
				res.json(post);
			})
			.catch(err => res.json(err));
	});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());

app.use('/api/posts', postRoutes);


// JSON.parse(_USERS);
