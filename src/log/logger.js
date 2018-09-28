const path = require('path');
const winston = require('winston');

const logger = winston.createLogger({
	transports: [
		new winston.transports.File({
			level: 'info',
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


module.exports = logger;
