const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const winston = require('winston');

const basename = path.basename(__filename);

const db = {};

const logger = winston.createLogger({
	transports: [
		new winston.transports.File({
			level: 'silly',
			filename: path.join(__dirname, 'all-logs.log'),
			handleExceptions: true,
			json: true,
			maxsize: 5242880, // 5MB
			maxFiles: 5,
			colorize: false
		}),
		new winston.transports.Console({
			level: 'debug',
			colorize: true
		}),
	],
	exitOnError: false
});

const sequelize = new Sequelize('db', 'user', 'pass', {
	host: 'localhost',
	dialect: 'sqlite',
	storage: 'db.sqlite',
	// logging: logger.info,
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
