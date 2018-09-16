const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);

const db = {};

const sequelize = new Sequelize('db', 'user', 'pass', {
	host: 'localhost',
	dialect: 'sqlite',
	storage: 'db.sqlite',
	operatorsAliases: false, // query operators can be given string shortcuts. Disallowing this option is more secure
	define: {						// set default properties on a model when it is created
	}
});

fs.readdirSync(__dirname)
	.filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
	.forEach((file) => {
		const model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
